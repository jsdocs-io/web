import { packageName } from "@jsdocs-io/extractor";
import { Data, Effect } from "effect";

const forbiddenNames = ["git", "everything"];
const forbiddenProtocols = ["http:", "https:", "ftp:", "ftps:", "git:", "ssh:", "file:"];

export class ForbiddenPackageNameError extends Data.TaggedError("ForbiddenPackageNameError") {}
export class ForbiddenProtocolError extends Data.TaggedError("ForbiddenProtocolError") {}

export const parsePackagePageSlug = (slug = "") =>
	Effect.gen(function* (_) {
		const [first, second, ...rest] = slug.split("/") as [string, ...string[]];
		const isScopedPackage = first.startsWith("@") && !!second;
		const pkg = isScopedPackage ? `${first}/${second}` : first;
		if (forbiddenProtocols.some((p) => pkg.endsWith(`@${p}`))) {
			return yield* _(new ForbiddenProtocolError());
		}
		const pkgName = yield* _(packageName(pkg));
		if (forbiddenNames.includes(pkgName)) {
			return yield* _(new ForbiddenPackageNameError());
		}
		const beforeRest = !!second && !isScopedPackage ? [second] : [];
		const rawSubpath = [...beforeRest, ...rest].filter(Boolean).join("/");
		const subpath = ["", pkgName].includes(rawSubpath) ? "." : rawSubpath;
		return { pkg, pkgName, subpath };
	});
