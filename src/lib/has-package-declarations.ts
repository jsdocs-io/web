import { PackageAPI } from "@jsdocs-io/extractor";

export function hasPackageDeclarations({ api }: { api?: PackageAPI }): boolean {
  return Object.values(api?.declarations ?? {}).flat().length > 0;
}
