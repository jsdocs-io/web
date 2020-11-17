import * as minio from 'minio';
import stream from 'stream';
import { minioConfig, storageBucket } from '../../config';
import { parseJSONStream } from './parse-json-stream';

export type StorageClient = Pick<minio.Client, 'getObject' | 'putObject'>;

export class Storage {
    /**
     *
     * @param client - S3 compatible storage client
     * @param bucket - storage bucket name
     */
    constructor(
        private readonly client: StorageClient = new minio.Client(minioConfig),
        readonly bucket: string = storageBucket
    ) {}

    /**
     * @param name - object name
     */
    async getObject<T>({ name }: { name: string }): Promise<T | undefined> {
        try {
            const jsonStream = await this.client.getObject(this.bucket, name);
            const obj = await parseJSONStream<T>({ jsonStream });
            return obj;
        } catch {
            return undefined;
        }
    }

    /**
     * @param name - object name
     * @param obj - object to store serialized as JSON
     */
    async putObject({ name, obj }: { name: string; obj: any }): Promise<void> {
        try {
            const jsonStream = stream.Readable.from(JSON.stringify(obj));
            await this.client.putObject(this.bucket, name, jsonStream);
        } catch {}
    }
}
