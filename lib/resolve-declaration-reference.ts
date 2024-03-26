import type { DocDeclarationReference } from "@microsoft/tsdoc";

export const resolveDeclarationReference = (ref: DocDeclarationReference) => {
	const { packageName, memberReferences } = ref;
	const declarationId = memberReferences
		.map((ref) => ref.memberIdentifier?.identifier)
		.filter(Boolean)
		.join(".");
	return { pkgName: packageName, declarationId };
};
