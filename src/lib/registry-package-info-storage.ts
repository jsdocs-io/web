import { RegistryPackageInfo } from '@jsdocs-io/package-analyzer';
import { version as packageAnalyzerVersion } from '@jsdocs-io/package-analyzer/package.json';
import { loadObject, storeObject } from './storage';

export async function loadRegistryPackageInfo({
    name,
    version,
}: {
    name: string;
    version: string;
}): Promise<RegistryPackageInfo | undefined> {
    return loadObject({
        name: getObjectName({ name, version }),
    });
}

export async function storeRegistryPackageInfo({
    name,
    version,
    info,
}: {
    name: string;
    version: string;
    info: RegistryPackageInfo;
}): Promise<void> {
    return storeObject({
        name: getObjectName({ name, version }),
        obj: info,
    });
}

function getObjectName({
    name,
    version,
}: {
    name: string;
    version: string;
}): string {
    return `registry-package-info/${packageAnalyzerVersion}/${name}/${version}.json`;
}
