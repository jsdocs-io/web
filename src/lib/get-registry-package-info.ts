import { RegistryPackageInfo } from '@jsdocs-io/extractor';
import path from 'path';
import Piscina from 'piscina';
import {
    loadRegistryPackageInfo,
    storeRegistryPackageInfo,
} from './registry-package-info-storage';

const piscina = new Piscina({
    filename: path.join(
        process.cwd(),
        'src/worker/analyze-registry-package-worker.js'
    ),
});

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

    // Run `analyzeRegistryPackage({ name, version })` in a separate worker thread
    const info: RegistryPackageInfo = await piscina.runTask({ name, version });

    await storeRegistryPackageInfo({ name, version, info });

    return info;
}
