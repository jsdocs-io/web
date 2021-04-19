import { RegistryPackageInfo } from '@jsdocs-io/extractor';
import EventEmitter from 'events';
import path from 'path';
import Piscina from 'piscina';

const piscina = new Piscina({
    filename: path.join(
        process.cwd(),
        'src/worker/analyze-registry-package-worker.js'
    ),
});

/**
 * Run `analyzeRegistryPackage({ name, version })` in a separate worker thread
 * and timeout after 55 seconds (Vercel limits functions to 60 seconds).
 */
export async function analyzeRegistryPackageWithWorker({
    name,
    version,
}: {
    name: string;
    version: string;
}): Promise<RegistryPackageInfo> {
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

    return info;
}
