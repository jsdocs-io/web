import { PackageAPI } from '@jsdocs-io/package-analyzer';

export function hasPackageDeclarations({ api }: { api?: PackageAPI }): boolean {
    return Object.values(api?.declarations ?? {}).flat().length > 0;
}
