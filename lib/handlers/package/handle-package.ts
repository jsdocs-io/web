import { Bun, getPackageJson } from "@jsdocs-io/extractor";
import { goTry } from "go-go-try";
import { join } from "pathe";
import { serverEnv } from "../../server-env";
import { checkLicense } from "../../utils/check-license";
import { packageId } from "../../utils/package-id";
import { resolvePackage } from "../../utils/resolve-package";
import { tempDir } from "../../utils/temp-dir";
import { getLogger } from "../get-logger";
import { redirect } from "../redirect";
import { parsePackageSlug } from "./parse-package-slug";

const bun = new Bun(serverEnv.BUN_PATH);

export interface HandlePackageOutput {}

export async function handlePackage(slug: string) {
	const log = getLogger("handlePackage");
	log.info({ path: `/package/${slug}` });

	// Start the performance timer.
	const start = performance.now();

	// Parse the package page slug.
	const [slugErr, slugOut] = goTry(() => parsePackageSlug(slug));
	if (slugErr !== undefined) {
		log.error({ err: slugErr });
		return redirect("/404");
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
		return redirect("/404");
	}

	// Redirect to the canonical package page if necessary.
	const resolvedPkg = resolvePackage(pkgName, packages);
	const pkgId = packageId(resolvedPkg, subpath);
	if (pkg !== resolvedPkg) {
		log.info({ redirect: `${pkg} -> ${resolvedPkg}` });
		return redirect(`/package/${pkgId}`);
	}

	// Read the package's own `package.json`.
	const pkgDir = join(cwd, "node_modules", pkgName);
	const [pkgJsonErr, pkgJson] = await goTry(getPackageJson(pkgDir));
	if (pkgJsonErr !== undefined) {
		log.error({ err: pkgJsonErr });
		return redirect("/500");
	}

	// Check if the package has an SPDX license.
	const [licenseErr] = goTry(() => checkLicense(pkgJson.license));
	if (licenseErr !== undefined) {
		log.warn({ warn: licenseErr });
		return {
			status: "invalid-license" as const,
			pkgId,
			subpath,
			pkgJson,
			generatedAt: generatedAt(),
			generatedIn: generatedIn(start),
		};
	}

	// TODO:
	// // Check if the package provides type definitions and if not
	// // check if there is an associated DefinitelyTyped (DT) package.
	// const typesRes = yield * Effect.either(packageTypes(pkgJson, subpath));
	// if (Either.isLeft(typesRes)) {
	// 	const dtPkgName = yield * findDefinitelyTypedPackage({ pkgName, cwd });
	// 	if (!dtPkgName) {
	// 		yield * Effect.logWarning(`no types: ${pkgId}`);
	// 		return {
	// 			status: "no-types" as const,
	// 			pkgId,
	// 			subpath,
	// 			pkgJson,
	// 			generatedAt: generatedAt(),
	// 			generatedIn: generatedIn(start),
	// 		};
	// 	}
	// 	return {
	// 		status: "definitely-typed" as const,
	// 		pkgId,
	// 		subpath,
	// 		pkgJson,
	// 		dtPkgName,
	// 		generatedAt: generatedAt(),
	// 		generatedIn: generatedIn(start),
	// 	};
	// }

	// // Check if the DB already has the package API.
	// const db = yield * Db;
	// yield * Effect.logInfo(`using db: ${db.name}`);
	// const getPkgApiRes = yield * Effect.either(db.getPackageApi({ pkg, subpath }));
	// if (Either.isLeft(getPkgApiRes)) {
	// 	yield * Effect.logWarning(getPkgApiRes.left);
	// } else {
	// 	yield * Effect.logInfo(`db has package api for: ${pkgId}`);
	// 	const pkgApi = getPkgApiRes.right;
	// 	return {
	// 		status: "with-api" as const,
	// 		pkgId,
	// 		subpath,
	// 		pkgJson,
	// 		pkgApi,
	// 		generatedAt: generatedAt(),
	// 		generatedIn: generatedIn(start),
	// 	};
	// }

	// // Extract the package API.
	// const pkgApiRes = yield * Effect.either(extractPackageApi({ pkg, subpath }));
	// if (Either.isLeft(pkgApiRes)) {
	// 	yield * Effect.logError(pkgApiRes.left);
	// 	return {
	// 		status: "no-api" as const,
	// 		pkgId,
	// 		subpath,
	// 		pkgJson,
	// 		generatedAt: generatedAt(),
	// 		generatedIn: generatedIn(start),
	// 	};
	// }
	// const pkgApi = pkgApiRes.right;

	// // Store the package API in the DB.
	// const setPkgApiRes = yield * Effect.either(db.setPackageApi({ pkg, subpath, pkgApi }));
	// if (Either.isLeft(setPkgApiRes)) {
	// 	yield * Effect.logError(setPkgApiRes.left);
	// } else {
	// 	yield * Effect.logInfo(`db set package api for: ${pkgId}`);
	// }

	// // Return data for rendering.
	// return {
	// 	status: "with-api" as const,
	// 	pkgId,
	// 	subpath,
	// 	pkgJson,
	// 	pkgApi,
	// 	generatedAt: generatedAt(),
	// 	generatedIn: generatedIn(start),
	// };
}

function generatedAt(): string {
	return new Date().toISOString();
}

function generatedIn(start: number): number {
	return Math.round(performance.now() - start);
}
