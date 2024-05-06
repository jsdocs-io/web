import type { PackageApi } from "@jsdocs-io/extractor";
import { Effect } from "effect";
import { Db, DbGetError } from "./db";
import { packageId } from "./package-id";

const db = new Map<string, PackageApi>();

export const memDb = Db.of({
	name: "mem-db",
	getPackageApi: ({ pkg, subpath }) =>
		Effect.gen(function* () {
			const pkgApi = db.get(packageId({ pkg, subpath }));
			if (!pkgApi) {
				return yield* new DbGetError({ cause: "not found" });
			}
			return pkgApi;
		}),
	setPackageApi: ({ pkg, subpath, pkgApi }) =>
		Effect.gen(function* () {
			db.set(packageId({ pkg, subpath }), pkgApi);
		}),
});
