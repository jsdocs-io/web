import type { ExtractedDeclaration } from "@jsdocs-io/extractor";
import urlJoin from "url-join";

export type ResolvedUnpkgPackages = {
	pattern: string;
	replacement: string;
};

export const unpkgUrl = (
	declaration: ExtractedDeclaration,
	resolvedUnpkgPackages: ResolvedUnpkgPackages[],
) => {
	// Generate URLs like https://unpkg.com/browse/foo@1.0.0/index.d.ts#L99
	const { pattern, replacement } = resolvedUnpkgPackages.find(({ pattern }) =>
		declaration.file.startsWith(pattern),
	)!;
	const resolvedFile = declaration.file.replace(pattern, replacement);
	return urlJoin("https://unpkg.com/browse", resolvedFile, `#L${declaration.line}`);
};

export const resolveUnpkgPackages = (packages: string[]): ResolvedUnpkgPackages[] =>
	packages.map((id) => ({
		pattern: `/${id.slice(0, id.lastIndexOf("@"))}/`,
		replacement: `/${id}/`,
	}));
