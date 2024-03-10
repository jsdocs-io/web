import { packageName } from "@jsdocs-io/extractor";
import { Effect } from "effect";

export const parsePackagePageSlug = (slug = "") =>
	Effect.gen(function* (_) {
		const [first, second, ...rest] = slug.split("/") as [string, ...string[]];
		const isScopedPackage = first.startsWith("@") && !!second;
		const pkg = isScopedPackage ? `${first}/${second}` : first;
		const pkgName = yield* _(packageName(pkg));
		const beforeRest = !!second && !isScopedPackage ? [second] : [];
		const rawSubpath = [...beforeRest, ...rest].filter(Boolean).join("/");
		const subpath = ["", pkgName].includes(rawSubpath) ? "." : rawSubpath;
		return { pkg, pkgName, subpath };
	});
