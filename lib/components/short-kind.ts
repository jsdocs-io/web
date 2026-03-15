import type { AllExtractedDeclarationKind } from "@jsdocs-io/extractor";

export function shortKind(kind: AllExtractedDeclarationKind): string {
  // Keep only the most specific part of the declaration kind.
  // For example, `class` -> `class`, `class-property` -> `property`.
  const [first, ...rest] = kind.split("-") as [string, ...string[]];
  return rest.length > 0 ? rest.join(" ") : first;
}
