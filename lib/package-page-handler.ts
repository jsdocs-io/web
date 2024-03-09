import {
	installPackage,
	packageJson,
	packageTypes,
	workDir,
} from "@jsdocs-io/extractor";
import { Effect, Either } from "effect";
import { join } from "pathe";
import { bunPath } from "./bun-path";
import { definitelyTypedName } from "./definitely-typed-name";
import { isValidLicense } from "./is-valid-license";
import { packagePagePath } from "./package-page-path";
import { parsePackageSlug } from "./parse-package-slug";

export const packagePageHandler = (slug = "") =>
	Effect.runPromise(Effect.scoped(packagePageHandlerEffect(slug)));

const packagePageHandlerEffect = (slug = "") =>
	Effect.gen(function* (_) {
		// Parse page slug.
		const { pkg, pkgName, subpath } = yield* _(parsePackageSlug(slug));

		// Install the package to let bun resolve the correct version.
		const { path: cwd } = yield* _(workDir);
		yield* _(installPackage({ pkg, cwd, bunPath }));

		// Read `package.json`.
		const pkgDir = join(cwd, "node_modules", pkgName);
		const pkgJson = yield* _(packageJson(pkgDir));

		// Redirect to the resolved package version page if necessary.
		const resolvedPkg = pkgJson._id;
		if (pkg !== resolvedPkg) {
			return redirect(packagePagePath({ resolvedPkg, subpath }));
		}

		// Check if the package has an SPDX license.
		if (!isValidLicense(pkgJson.license)) {
			return { pkgJson, warning: "invalid-license" as const };
		}

		// Check if the package has type definitions and if not
		// check if there is a DefinitelyTyped package available.
		const types = yield* _(Effect.either(packageTypes(pkgJson, subpath)));
		if (Either.isLeft(types)) {
			const dtPkgName = definitelyTypedName(pkgName);
			if (dtPkgName === pkgName) {
				// Deprecated DefinitelyTyped packages have no types.
				return { pkgJson, warning: "no-types" as const };
			}
			const dtPkgs = yield* _(
				Effect.either(installPackage({ pkg: dtPkgName, cwd, bunPath })),
			);
			if (Either.isLeft(dtPkgs)) {
				return { pkgJson, warning: "no-types" as const };
			}
			return { pkgJson, dtPkgName, warning: "definitely-typed" as const };
		}

		//
		return { pkgJson };
	}).pipe(
		Effect.catchTags({
			PackageNameError: () => Effect.succeed(redirect("/404")),
			InstallPackageError: () => Effect.succeed(redirect("/404")),
			WorkDirError: () => Effect.succeed(redirect("/500")),
			PackageJsonError: () => Effect.succeed(redirect("/500")),
		}),
	);

const redirect = (path: string) =>
	new Response(null, { status: 302, headers: { Location: path } });
