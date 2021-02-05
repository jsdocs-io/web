import { Client } from 'minio';
import stream from 'stream';
import { minioConfig, storageBucket } from '../../config';
import { parseJSONStream } from './parse-json-stream';

export type StorageClient = Pick<Client, 'getObject' | 'putObject'>;

const storageClient: StorageClient = new Client(minioConfig);

export async function loadObject<T>({
    name,
    client = storageClient,
}: {
    name: string;
    client?: StorageClient;
}): Promise<T | undefined> {
    let obj;
    try {
        const jsonStream = await client.getObject(storageBucket, name);
        obj = await parseJSONStream<T>({ jsonStream });
    } catch {}
    return obj;
}

export async function storeObject({
    name,
    obj,
    client = storageClient,
}: {
    name: string;
    obj: any;
    client?: StorageClient;
}): Promise<void> {
    try {
        const jsonStream = stream.Readable.from(JSON.stringify(obj));
        await client.putObject(storageBucket, name, jsonStream);
    } catch {}
}
