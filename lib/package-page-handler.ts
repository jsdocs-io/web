import { installPackage, packageJson, packageTypes, workDir } from "@jsdocs-io/extractor";
import { Effect, Either } from "effect";
import { join } from "pathe";
import { bunPath } from "./bun-path";
import { definitelyTypedName } from "./definitely-typed-name";
import { isValidLicense } from "./is-valid-license";
import { packagePagePath } from "./package-page-path";
import { parsePackagePageSlug } from "./parse-package-page-slug";
import { redirect } from "./redirect";

export const packagePageHandler = (slug = "") =>
	Effect.runPromise(Effect.scoped(packagePageHandlerEffect(slug)));

const packagePageHandlerEffect = (slug = "") =>
	Effect.gen(function* (_) {
		yield* _(Effect.logInfo(`handle: /package/${slug}`));

		// Parse package page slug.
		const parseRes = yield* _(Effect.either(parsePackagePageSlug(slug)));
		if (Either.isLeft(parseRes)) {
			yield* _(Effect.logError(parseRes.left));
			return redirect("/404");
		}
		const { pkg, pkgName, subpath } = parseRes.right;

		// Get temporary work directory.
		const workDirRes = yield* _(Effect.either(workDir));
		if (Either.isLeft(workDirRes)) {
			yield* _(Effect.logError(workDirRes.left));
			return redirect("/500");
		}
		const { path: cwd } = workDirRes.right;

		// Install the package to let bun resolve the correct version.
		// Assume that installation errors are only caused by non existing packages.
		const installRes = yield* _(Effect.either(installPackage({ pkg, cwd, bunPath })));
		if (Either.isLeft(installRes)) {
			yield* _(Effect.logError(installRes.left));
			return redirect("/404");
		}
		const packages = installRes.right;

		// Redirect to the resolved package version page if necessary.
		const resolvedPkg = packages.find((p) => p.startsWith(`${pkgName}@`))!;
		if (pkg !== resolvedPkg) {
			yield* _(Effect.logInfo(`redirect: ${pkg} -> ${resolvedPkg}`));
			return redirect(packagePagePath({ resolvedPkg, subpath }));
		}

		// Read `package.json`.
		const pkgDir = join(cwd, "node_modules", pkgName);
		const pkgJsonRes = yield* _(Effect.either(packageJson(pkgDir)));
		if (Either.isLeft(pkgJsonRes)) {
			yield* _(Effect.logError(pkgJsonRes.left));
			return redirect("/500");
		}
		const pkgJson = pkgJsonRes.right;

		// Check if the package has an SPDX license.
		const { license } = pkgJson;
		if (!isValidLicense(license)) {
			yield* _(Effect.logWarning(`invalid license: ${pkg} (${license})`));
			return { status: "invalid-license" as const, pkgJson };
		}

		// Check if the package provides type definitions and if not
		// check if there is an associated DefinitelyTyped (DT) package.
		const typesRes = yield* _(packageTypes(pkgJson, subpath).pipe(Effect.either));
		if (Either.isLeft(typesRes)) {
			const dtPkgName = definitelyTypedName(pkgName);
			if (
				// This is a deprecated DT package (exists and has no types).
				dtPkgName === pkgName ||
				// DT package not found (failed to install).
				Either.isLeft(yield* _(Effect.either(installPackage({ pkg: dtPkgName, cwd, bunPath }))))
			) {
				yield* _(Effect.logWarning(`no types: ${pkg}`));
				return { status: "no-types" as const, pkgJson };
			} else {
				// DT package is available.
				return { status: "definitely-typed" as const, pkgJson, dtPkgName };
			}
		}

		//
		return { status: "ok" as const, pkgJson };
	});
