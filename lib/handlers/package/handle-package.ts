import {
	Bun,
	getPackageApi,
	getPackageJson,
	getPackageTypes,
	type PackageApi,
} from "@jsdocs-io/extractor";
import { goTry } from "go-go-try";
import { join } from "pathe";
import type { NormalizedPackageJson } from "read-pkg";
import { PackageApiMemDb } from "../../db/package-api-mem-db";
import { PackageApiR2Bucket } from "../../db/package-api-r2-bucket";
import { serverEnv } from "../../server-env";
import { checkLicense } from "../../utils/check-license";
import { getDTPackageName, isDTPackage } from "../../utils/definitely-typed";
import { packageId } from "../../utils/package-id";
import { resolvePackage } from "../../utils/resolve-package";
import { tempDir } from "../../utils/temp-dir";
import { getLogger } from "../get-logger";
import { parsePackageSlug } from "./parse-package-slug";

const bun = new Bun(serverEnv.BUN_PATH);
const db = serverEnv.CF_BUCKET_NAME ? new PackageApiR2Bucket() : new PackageApiMemDb();

export interface PackageInfo {
	pkgId: string;
	subpath: string;
	pkgJson: NormalizedPackageJson;
	generatedAt: string;
	generatedIn: number;
}

export interface PackageInfoWithDtPackage extends PackageInfo {
	dtPkgName: string;
}

export interface PackageInfoWithApi extends PackageInfo {
	pkgApi: PackageApi;
}

export type HandlePackageOutput =
	| { status: "bad-request" }
	| { status: "not-found" }
	| { status: "found"; path: string }
	| { status: "error" }
	| { status: "pkg-has-invalid-license"; pkgInfo: PackageInfo }
	| { status: "pkg-is-deprecated-dt-pkg"; pkgInfo: PackageInfo }
	| { status: "pkg-has-no-types"; pkgInfo: PackageInfo }
	| { status: "pkg-has-dt-pkg"; pkgInfo: PackageInfoWithDtPackage }
	| { status: "pkg-has-api"; pkgInfo: PackageInfoWithApi }
	| { status: "pkg-has-no-api"; pkgInfo: PackageInfo };

export async function handlePackage(slug: string): Promise<HandlePackageOutput> {
	const log = getLogger("handlePackage");
	log.info({ path: `/package/${slug}` });

	// Start the performance timer.
	const start = performance.now();

	// Parse the package page slug.
	const [slugErr, slugOut] = goTry(() => parsePackageSlug(slug));
	if (slugErr !== undefined) {
		log.error({ err: slugErr });
		return { status: "bad-request" };
	}
	const { pkg, pkgName, subpath } = slugOut;

	// Get a temporary work directory.
	await using dir = await tempDir();
	const cwd = dir.path;

	// Install the package to let bun resolve the correct version.
	// Assume that installation errors are only caused by non existing packages.
	const [bunErr, packages] = await goTry(bun.add(pkg, cwd));
	if (bunErr !== undefined) {
		log.error({ err: bunErr });
		return { status: "not-found" };
	}

	// Redirect to the canonical package page if necessary.
	const resolvedPkg = resolvePackage(pkgName, packages);
	const pkgId = packageId(resolvedPkg, subpath);
	if (pkg !== resolvedPkg) {
		log.info({ redirect: `${pkg} -> ${resolvedPkg}` });
		return { status: "found", path: `/package/${pkgId}` };
	}

	// Read the package's own `package.json`.
	const pkgDir = join(cwd, "node_modules", pkgName);
	const [pkgJsonErr, pkgJson] = await goTry(getPackageJson(pkgDir));
	if (pkgJsonErr !== undefined) {
		log.error({ err: pkgJsonErr });
		return { status: "error" };
	}

	// Check if the package has an SPDX license.
	const [licenseErr] = goTry(() => checkLicense(pkgJson.license));
	if (licenseErr !== undefined) {
		log.warn({ warn: licenseErr });
		return {
			status: "pkg-has-invalid-license",
			pkgInfo: {
				pkgId,
				subpath,
				pkgJson,
				generatedAt: generatedAt(),
				generatedIn: generatedIn(start),
			},
		};
	}

	// Check if the package provides type definitions and if not
	// check if there is a corresponding DefinitelyTyped (DT) package.
	const [typesErr, types] = goTry(() => getPackageTypes({ pkgJson, subpath }));
	if (typesErr !== undefined || !types) {
		// A DT package without types is deprecated.
		if (isDTPackage(pkgName)) {
			log.warn({ warn: "deprecated DT package" });
			return {
				status: "pkg-is-deprecated-dt-pkg",
				pkgInfo: {
					pkgId,
					subpath,
					pkgJson,
					generatedAt: generatedAt(),
					generatedIn: generatedIn(start),
				},
			};
		}

		// Try to install the corresponding DT package to check if it exists.
		const dtPkgName = getDTPackageName(pkgName);
		const [bunErr] = await goTry(bun.add(dtPkgName, cwd));
		if (bunErr !== undefined) {
			log.warn({ warn: "no DT package" });
			return {
				status: "pkg-has-no-types",
				pkgInfo: {
					pkgId,
					subpath,
					pkgJson,
					generatedAt: generatedAt(),
					generatedIn: generatedIn(start),
				},
			};
		}

		// A DT package exists.
		return {
			status: "pkg-has-dt-pkg",
			pkgInfo: {
				pkgId,
				subpath,
				pkgJson,
				dtPkgName,
				generatedAt: generatedAt(),
				generatedIn: generatedIn(start),
			},
		};
	}

	// Check if the DB already has the package API.
	const [dbGetErr, dbPkgApi] = await goTry(db.getPackageApi(pkgId));
	if (dbGetErr !== undefined) {
		log.warn({ db: db.dbName, warn: dbGetErr });
	}
	if (dbPkgApi) {
		log.info({ db: db.dbName, pkgId, getPkgApi: true });
		return {
			status: "pkg-has-api",
			pkgInfo: {
				pkgId,
				subpath,
				pkgJson,
				pkgApi: dbPkgApi,
				generatedAt: generatedAt(),
				generatedIn: generatedIn(start),
			},
		};
	}

	// Extract the package API.
	const [pkgApiErr, pkgApi] = await goTry(getPackageApi({ pkg, subpath, bun }));
	if (pkgApiErr !== undefined) {
		log.error({ err: pkgApiErr });
		return {
			status: "pkg-has-no-api" as const,
			pkgInfo: {
				pkgId,
				subpath,
				pkgJson,
				generatedAt: generatedAt(),
				generatedIn: generatedIn(start),
			},
		};
	}

	// Store the package API in the DB.
	const [dbSetErr] = await goTry(db.setPackageApi(pkgId, pkgApi));
	if (dbSetErr !== undefined) {
		log.error({ db: db.dbName, pkgId, err: dbSetErr });
	} else {
		log.info({ db: db.dbName, pkgId, setPkgApi: true });
	}

	// Return data for rendering.
	return {
		status: "pkg-has-api" as const,
		pkgInfo: {
			pkgId,
			subpath,
			pkgJson,
			pkgApi,
			generatedAt: generatedAt(),
			generatedIn: generatedIn(start),
		},
	};
}

function generatedAt(): string {
	return new Date().toISOString();
}

function generatedIn(start: number): number {
	return Math.round(performance.now() - start);
}
