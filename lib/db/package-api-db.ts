import type { PackageApi } from "@jsdocs-io/extractor";

export interface PackageApiDb {
	dbName: string;
	getPackageApi: (pkgId: string) => Promise<PackageApi>;
	setPackageApi: (pkgId: string, pkgApi: PackageApi) => Promise<void>;
}
