import * as minio from 'minio';

/** Configuration for the minio client with fallback to a local minio server */
export const minioConfig: minio.ClientOptions = (() => {
    const endPoint = process.env.STORAGE_ENDPOINT ?? 'localhost';
    const accessKey = process.env.STORAGE_ACCESS_KEY ?? 'minioadmin';
    const secretKey = process.env.STORAGE_SECRET_KEY ?? 'minioadmin';
    const region = process.env.STORAGE_REGION;
    const isLocalhost = endPoint === 'localhost';
    const port = isLocalhost ? 9000 : undefined;
    const useSSL = !isLocalhost;
    return { endPoint, accessKey, secretKey, region, port, useSSL };
})();

/** Storage bucket name */
export const storageBucket = process.env.STORAGE_BUCKET ?? 'storage.jsdocs.io';
