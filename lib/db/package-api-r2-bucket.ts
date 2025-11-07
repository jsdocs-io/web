import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { PackageApi } from "@jsdocs-io/extractor";
import { compressSync, decompressSync, strFromU8, strToU8 } from "fflate";
import { serverEnv } from "../server-env";
import type { PackageApiDb } from "./package-api-db";

export class PackageApiR2Bucket implements PackageApiDb {
	dbName = "PackageApiR2Bucket";
	#s3 = new S3Client({
		region: "auto",
		endpoint: `https://${serverEnv.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId: serverEnv.CF_ACCESS_KEY_ID,
			secretAccessKey: serverEnv.CF_SECRET_ACCESS_KEY,
		},
	});

	async getPackageApi(pkgId: string): Promise<PackageApi> {
		const cmd = new GetObjectCommand({
			Bucket: serverEnv.CF_BUCKET_NAME,
			Key: `${pkgId}.gz`,
		});
		const res = await this.#s3.send(cmd);
		const body = await res.Body!.transformToByteArray();
		const pkgApiJson = strFromU8(decompressSync(body));
		const pkgApi = JSON.parse(pkgApiJson) as unknown as PackageApi;
		return pkgApi;
	}

	async setPackageApi(pkgId: string, pkgApi: PackageApi) {
		const pkgApiJson = JSON.stringify(pkgApi);
		const pkgApiGz = compressSync(strToU8(pkgApiJson));
		const cmd = new PutObjectCommand({
			Bucket: serverEnv.CF_BUCKET_NAME,
			Key: `${pkgId}.gz`,
			Body: pkgApiGz,
		});
		await this.#s3.send(cmd);
	}
}
