import type { PackageApi } from "@jsdocs-io/extractor";
import type { PackageApiDb } from "./package-api-db";

export class PackageApiMemDb implements PackageApiDb {
	dbName = "PackageApiMemDb";
	#db = new Map<string, PackageApi>();

	async getPackageApi(pkgId: string): Promise<PackageApi> {
		const pkgApi = this.#db.get(pkgId);
		if (!pkgApi) throw new Error("package api not found in mem db");
		return pkgApi;
	}

	async setPackageApi(pkgId: string, pkgApi: PackageApi) {
		this.#db.set(pkgId, pkgApi);
	}
}
