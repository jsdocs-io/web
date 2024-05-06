import type { AllExtractedDeclaration } from "@jsdocs-io/extractor";
import urlJoin from "url-join";

export type UnpkgUrlFn = ReturnType<typeof makeUnpkgUrl>;

export const makeUnpkgUrl = (packages: string[]) => {
	const resolvedUnpkgPackages = packages.map((id) => ({
		// Replace package names with resolved IDs (e.g., `/foo/` -> `/foo@1.0.0/`)
		pattern: `/${id.slice(0, id.lastIndexOf("@"))}/`,
		replacement: `/${id}/`,
	}));
	return (declaration: AllExtractedDeclaration): string => {
		// Generate URLs like https://unpkg.com/browse/foo@1.0.0/index.d.ts#L99.
		// Note: if the declaration comes from the TS `lib.d.ts` files (e.g, `console`), `res` will be `undefined`.
		const res = resolvedUnpkgPackages.find(({ pattern }) => declaration.file.startsWith(pattern));
		const resolvedFile =
			res ? declaration.file.replace(res.pattern, res.replacement) : declaration.file;
		return urlJoin("https://unpkg.com/browse", resolvedFile, `#L${declaration.line}`);
	};
};
