import { installPackage, packageJson, packageTypes, workDir } from "@jsdocs-io/extractor";
import { Effect, Either } from "effect";
import { join } from "pathe";
import { bunPath } from "./bun-path";
import { definitelyTypedName } from "./definitely-typed-name";
import { isValidLicense } from "./is-valid-license";
import { packagePagePath } from "./package-page-path";
import { parsePackageSlug } from "./parse-package-slug";
import { redirect } from "./redirect";

export const packagePageHandler = (slug = "") =>
	Effect.runPromise(Effect.scoped(packagePageHandlerEffect(slug)));

const packagePageHandlerEffect = (slug = "") =>
	Effect.gen(function* (_) {
		// Parse page slug.
		yield* _(Effect.logInfo({ slug }));
		const { pkg, pkgName, subpath } = yield* _(parsePackageSlug(slug));
		yield* _(Effect.logInfo({ pkg, pkgName, subpath }));

		// Install the package to let bun resolve the correct version.
		const { path: cwd } = yield* _(workDir);
		yield* _(installPackage({ pkg, cwd, bunPath }));

		// Read `package.json`.
		const pkgDir = join(cwd, "node_modules", pkgName);
		const pkgJson = yield* _(packageJson(pkgDir));

		// Redirect to the resolved package version page if necessary.
		const resolvedPkg = pkgJson._id;
		if (pkg !== resolvedPkg) {
			yield* _(Effect.logInfo({ resolvedPkg }));
			return redirect(packagePagePath({ resolvedPkg, subpath }));
		}

		// Check if the package has an SPDX license.
		const { license } = pkgJson;
		if (!isValidLicense(license)) {
			const warning = "invalid-license" as const;
			yield* _(Effect.logWarning({ resolvedPkg, warning, license }));
			return { pkgJson, warning };
		}

		// Check if the package has type definitions and if not
		// check if there is a DefinitelyTyped package available.
		const types = yield* _(Effect.either(packageTypes(pkgJson, subpath)));
		if (Either.isLeft(types)) {
			const dtPkgName = definitelyTypedName(pkgName);
			const dtPkgs = yield* _(Effect.either(installPackage({ pkg: dtPkgName, cwd, bunPath })));
			if (Either.isLeft(dtPkgs) || dtPkgName === pkgName) {
				const warning = "no-types" as const;
				yield* _(Effect.logWarning({ resolvedPkg, warning }));
				return { pkgJson, warning };
			}
			const info = "definitely-typed" as const;
			yield* _(Effect.logInfo({ resolvedPkg, info, dtPkgName }));
			return { pkgJson, info, dtPkgName };
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
