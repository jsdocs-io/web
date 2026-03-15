import type { DocDeclarationReference } from "@microsoft/tsdoc";

export interface ResolvedDeclarationReference {
  pkgName: string | undefined;
  declarationId: string;
}

export function resolveDeclarationReference(
  ref: DocDeclarationReference,
): ResolvedDeclarationReference {
  const { packageName, memberReferences } = ref;
  const declarationId = memberReferences
    .map((ref) => ref.memberIdentifier?.identifier)
    .filter(Boolean)
    .join(".");
  return { pkgName: packageName, declarationId };
}
