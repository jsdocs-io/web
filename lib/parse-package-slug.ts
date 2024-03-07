import { PackageNameError } from "@jsdocs-io/extractor";
import { Effect } from "effect";
import validate from "validate-npm-package-name";

export const parsePackageSlug = (slug: string) =>
	Effect.suspend(() => {
		const [first, second, ...rest] = slug.split("/") as [string, ...string[]];
		const isScopedPackage = first.startsWith("@") && !!second;
		const pkg = isScopedPackage ? `${first}/${second}` : first;
		const versionMarker = pkg.lastIndexOf("@");
		const pkgName = pkg.slice(0, versionMarker > 0 ? versionMarker : undefined);
		if (!validate(pkgName).validForNewPackages) {
			return Effect.fail(new PackageNameError());
		}
		const beforeRest = !!second && !isScopedPackage ? [second] : [];
		const rawSubpath = [...beforeRest, ...rest].filter(Boolean).join("/");
		const subpath = ["", pkgName].includes(rawSubpath) ? "." : rawSubpath;
		return Effect.succeed({ pkg, pkgName, subpath });
	});
