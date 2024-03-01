import { PackageNameError } from "@jsdocs-io/extractor";
import { err, ok, type Result } from "neverthrow";
import validate from "validate-npm-package-name";

export type ParsePackageSlugReturn = {
	pkg: string;
	subpath: string;
};

export const parsePackageSlug = (
	slug: string,
): Result<ParsePackageSlugReturn, PackageNameError> => {
	const [first, second, ...rest] = slug.split("/") as [string, ...string[]];
	const isScopedPackage = first.startsWith("@") && !!second;
	const pkg = isScopedPackage ? `${first}/${second}` : first;
	const versionMarker = pkg.lastIndexOf("@");
	const name = pkg.slice(0, versionMarker > 0 ? versionMarker : undefined);
	if (!validate(name).validForNewPackages) {
		return err(
			new PackageNameError("invalid npm package name", { cause: { name } }),
		);
	}
	const beforeRest = !!second && !isScopedPackage ? [second] : [];
	const subpath = [...beforeRest, ...rest].filter(Boolean).join("/") || ".";
	return ok({ pkg, subpath });
};
