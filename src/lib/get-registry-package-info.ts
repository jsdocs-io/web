import { RegistryPackageInfo } from '@jsdocs-io/extractor';
import { analyzeRegistryPackageWithWorker } from './analyze-registry-package-with-worker';
import {
    loadRegistryPackageInfo,
    storeRegistryPackageInfo,
} from './registry-package-info-storage';

export async function getRegistryPackageInfo({
    name,
    version,
}: {
    name: string;
    version: string;
}): Promise<RegistryPackageInfo> {
    const cachedInfo = await loadRegistryPackageInfo({ name, version });
    if (cachedInfo) {
        return cachedInfo;
    }

    const info = await analyzeRegistryPackageWithWorker({ name, version });

    await storeRegistryPackageInfo({ name, version, info });

    return info;
}
