import { RegistryPackageInfo } from '@jsdocs-io/extractor';
import EventEmitter from 'events';
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
    // and timeout after 55 seconds (Vercel limits functions to 60 seconds)
    const abortEmitter = new EventEmitter();
    const analyzeRegistryPackageTask = piscina.runTask(
        { name, version },
        abortEmitter
    );
    const timeout = setTimeout(() => {
        abortEmitter.emit('abort');
    }, 55000);

    const info: RegistryPackageInfo = await analyzeRegistryPackageTask;
    clearTimeout(timeout);

    await storeRegistryPackageInfo({ name, version, info });

    return info;
}
