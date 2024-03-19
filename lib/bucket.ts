import {
	// GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import Zip from "adm-zip";
import { Effect } from "effect";
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
		Effect.gen(function* (_) {
			yield* _(
				new DbGetError({
					cause: new Error("Not implemented"),
				}),
			);
			return {} as any;
		}),
	setPackageApi: ({ pkg, subpath, pkgApi }) =>
		Effect.tryPromise({
			try: async () => {
				const pkgApiJson = JSON.stringify(pkgApi);
				const zip = new Zip();
				zip.addFile("package-api.json", Buffer.from(pkgApiJson, "utf8"));
				const buffer = zip.toBuffer();
				await s3Client.send(
					new PutObjectCommand({
						Bucket: serverEnv.CF_BUCKET_NAME,
						Key: `${packagePagePath({ pkg, subpath })}.zip`,
						Body: buffer,
					}),
				);
			},
			catch: (e) => new DbSetError({ cause: e }),
		}),
});
