import type { AllExtractedDeclaration } from "@jsdocs-io/extractor";
import urlJoin from "url-join";

export type UnpkgUrlFn = ReturnType<typeof makeUnpkgUrl>;

export const makeUnpkgUrl = (packages: string[]) => {
	const resolvedUnpkgPackages = packages.map((id) => ({
		// Replace package names with resolved IDs (e.g., `/foo/` -> `/foo@1.0.0/`)
		pattern: `/${id.slice(0, id.lastIndexOf("@"))}/`,
		replacement: `/${id}/`,
	}));
	return (declaration: AllExtractedDeclaration) => {
		// Generate URLs like https://unpkg.com/browse/foo@1.0.0/index.d.ts#L99
		const { pattern, replacement } = resolvedUnpkgPackages.find(({ pattern }) =>
			declaration.file.startsWith(pattern),
		)!;
		const resolvedFile = declaration.file.replace(pattern, replacement);
		return urlJoin("https://unpkg.com/browse", resolvedFile, `#L${declaration.line}`);
	};
};
