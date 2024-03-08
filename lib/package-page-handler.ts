import { Effect } from "effect";
import { packageSlugPath } from "./package-slug-path";
import { parsePackageSlug } from "./parse-package-slug";
import { resolvePackage } from "./resolve-package";

export const packagePageHandler = (slug = "") =>
	Effect.runPromise(Effect.scoped(packagePageHandlerEffect(slug)));

export const packagePageHandlerEffect = (slug = "") =>
	Effect.gen(function* (_) {
		if (!slug) {
			return redirect("/");
		}
		const { pkg, pkgName, subpath } = yield* _(parsePackageSlug(slug));
		const resolvedPkg = yield* _(resolvePackage({ pkg, pkgName }));
		if (pkg !== resolvedPkg) {
			return redirect(packageSlugPath({ resolvedPkg, subpath }));
		}
		return { pkg, pkgName, subpath };
	});

const redirect = (path: string) =>
	new Response(null, { status: 302, headers: { Location: path } });
