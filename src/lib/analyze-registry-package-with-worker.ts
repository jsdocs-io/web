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
    timeout = 55000,
}: {
    name: string;
    version: string;
    timeout?: number;
}): Promise<RegistryPackageInfo> {
    const abortEmitter = new EventEmitter();

    const analyzeRegistryPackageTask = piscina.run(
        { name, version },
        { signal: abortEmitter }
    );

    const timeoutHandle = setTimeout(() => {
        abortEmitter.emit('abort');
    }, timeout);

    const info: RegistryPackageInfo = await analyzeRegistryPackageTask;
    clearTimeout(timeoutHandle);

    return info;
}
