import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { PackageApi } from "@jsdocs-io/extractor";
import { Effect } from "effect";
import { compressSync, decompressSync, strFromU8, strToU8 } from "fflate";
import { Db, DbGetError, DbSetError } from "./db";
import { packagePagePath } from "./package-page-path";
import { serverEnv } from "./server-env";

const s3Client = new S3Client({
	region: "auto",
	endpoint: `https://${serverEnv.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: serverEnv.CF_ACCESS_KEY_ID,
		secretAccessKey: serverEnv.CF_SECRET_ACCESS_KEY,
	},
});

export const bucket = Db.of({
	getPackageApi: ({ pkg, subpath }) =>
		Effect.tryPromise({
			try: async () => {
				const response = await s3Client.send(
					new GetObjectCommand({
						Bucket: serverEnv.CF_BUCKET_NAME,
						Key: `${packagePagePath({ pkg, subpath })}.gz`,
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
				const pkgApiCompressed = compressSync(strToU8(pkgApiJson));
				await s3Client.send(
					new PutObjectCommand({
						Bucket: serverEnv.CF_BUCKET_NAME,
						Key: `${packagePagePath({ pkg, subpath })}.gz`,
						Body: pkgApiCompressed,
					}),
				);
			},
			catch: (e) => new DbSetError({ cause: e }),
		}),
});
