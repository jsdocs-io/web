import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { PackageApi } from "@jsdocs-io/extractor";
import { Effect } from "effect";
import { compressSync, decompressSync, strFromU8, strToU8 } from "fflate";
import { Db, DbGetError, DbSetError } from "./db";
import { packageId } from "./package-id";
import { serverEnv } from "./server-env";

const s3Client = new S3Client({
	region: "auto",
	endpoint: `https://${serverEnv.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: serverEnv.CF_ACCESS_KEY_ID,
		secretAccessKey: serverEnv.CF_SECRET_ACCESS_KEY,
	},
});

export const r2Bucket = Db.of({
	name: "r2-bucket",
	getPackageApi: ({ pkg, subpath }) =>
		Effect.tryPromise({
			try: async () => {
				const response = await s3Client.send(
					new GetObjectCommand({
						Bucket: serverEnv.CF_BUCKET_NAME,
						Key: `${packageId({ pkg, subpath })}.gz`,
					}),
				);
				const body = await response.Body!.transformToByteArray();
				const pkgApiJson = strFromU8(decompressSync(body));
				const pkgApi = JSON.parse(pkgApiJson) as PackageApi;
				return pkgApi;
			},
			catch: (e) => new DbGetError({ cause: e }),
		}),
	setPackageApi: ({ pkg, subpath, pkgApi }) =>
		Effect.tryPromise({
			try: async () => {
				const pkgApiJson = JSON.stringify(pkgApi);
				const pkgApiGz = compressSync(strToU8(pkgApiJson));
				await s3Client.send(
					new PutObjectCommand({
						Bucket: serverEnv.CF_BUCKET_NAME,
						Key: `${packageId({ pkg, subpath })}.gz`,
						Body: pkgApiGz,
					}),
				);
			},
			catch: (e) => new DbSetError({ cause: e }),
		}),
});