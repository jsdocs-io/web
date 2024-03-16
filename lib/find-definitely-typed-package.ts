import { PackageManager } from "@jsdocs-io/extractor";
import { Effect, Either } from "effect";
import { definitelyTypedName } from "./definitely-typed-name";

export type FindDefinitelyTypedPackageOptions = {
	pkgName: string;
	cwd: string;
};

export const findDefinitelyTypedPackage = ({ pkgName, cwd }: FindDefinitelyTypedPackageOptions) =>
	Effect.gen(function* (_) {
		const dtPkgName = definitelyTypedName(pkgName);
		const pm = yield* _(PackageManager);
		if (
			// This is already a DT package which is deprecated (exists and has no types).
			dtPkgName === pkgName ||
			// DT package not found (failed to install).
			Either.isLeft(yield* _(Effect.either(pm.installPackage({ pkg: dtPkgName, cwd }))))
		) {
			return undefined;
		}
		return dtPkgName;
	});
