import { installPackage, workDir } from "@jsdocs-io/extractor";
import { Effect } from "effect";

export type ResolvePackageOptions = {
	pkg: string;
	pkgName: string;
};

export const resolvePackage = ({ pkg, pkgName }: ResolvePackageOptions) =>
	Effect.gen(function* (_) {
		const { path: cwd } = yield* _(workDir);
		const packages = yield* _(installPackage({ pkg, cwd }));
		return packages.find((p) => p.startsWith(`${pkgName}@`))!;
	});
