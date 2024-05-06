import {
	PackageManager,
	bunPackageManager,
	extractPackageApiEffect as extractPackageApi,
	packageJson,
	packageTypes,
	workDir,
} from "@jsdocs-io/extractor";
import { Effect, Either } from "effect";
import { join } from "pathe";
import { Db } from "./db";
import { findDefinitelyTypedPackage } from "./find-definitely-typed-package";
import { isValidLicense } from "./is-valid-license";
import { memDb } from "./mem-db";
import { packageId } from "./package-id";
import { parsePackagePageSlug } from "./parse-package-page-slug";
import { r2Bucket } from "./r2-bucket";
import { redirect } from "./redirect";
import { resolvePackage } from "./resolve-package";
import { serverEnv } from "./server-env";

export type PackagePageHandlerReturn = Awaited<ReturnType<typeof packagePageHandler>>;
export type PackagePageHandlerProps = Exclude<PackagePageHandlerReturn, Response>;

export const packagePageHandler = (slug = "") =>
	packagePageHandlerEffect(slug).pipe(
		Effect.provideService(PackageManager, bunPackageManager(serverEnv.BUN_PATH)),
		Effect.provideService(Db, serverEnv.CF_BUCKET_NAME ? r2Bucket : memDb),
		Effect.scoped,
		Effect.runPromise,
	);

const packagePageHandlerEffect = (slug = "") =>
	Effect.gen(function* () {
		yield* Effect.logInfo(`handle: /package/${slug}`);
		const startTime = performance.now();

		// Parse package page slug.
		const parseRes = yield* Effect.either(parsePackagePageSlug(slug));
		if (Either.isLeft(parseRes)) {
			yield* Effect.logError(parseRes.left);
			return redirect("/404");
		}
		const { pkg, pkgName, subpath } = parseRes.right;

		// Get temporary work directory.
		const workDirRes = yield* Effect.either(workDir);
		if (Either.isLeft(workDirRes)) {
			yield* Effect.logError(workDirRes.left);
			return redirect("/500");
		}
		const { path: cwd } = workDirRes.right;

		// Install the package to let bun resolve the correct version.
		// Assume that installation errors are only caused by non existing packages.
		const pm = yield* PackageManager;
		const installRes = yield* Effect.either(pm.installPackage({ pkg, cwd }));
		if (Either.isLeft(installRes)) {
			yield* Effect.logError(installRes.left);
			return redirect("/404");
		}
		const packages = installRes.right;

		// Redirect to the resolved package version page if necessary.
		const resolvedPkg = resolvePackage({ pkgName, packages });
		const pkgId = packageId({ pkg: resolvedPkg, subpath });
		if (pkg !== resolvedPkg) {
			yield* Effect.logInfo(`redirect: ${pkg} -> ${resolvedPkg}`);
			return redirect(`/package/${pkgId}`);
		}

		// Read `package.json`.
		const pkgDir = join(cwd, "node_modules", pkgName);
		const pkgJsonRes = yield* Effect.either(packageJson(pkgDir));
		if (Either.isLeft(pkgJsonRes)) {
			yield* Effect.logError(pkgJsonRes.left);
			return redirect("/500");
		}
		const pkgJson = pkgJsonRes.right;

		// Check if the package has an SPDX license.
		const { license } = pkgJson;
		if (!isValidLicense(license)) {
			yield* Effect.logWarning(`invalid license: ${pkg} (${license})`);
			return {
				status: "invalid-license" as const,
				pkgId,
				subpath,
				pkgJson,
				...generatedTimestamp(startTime),
			};
		}

		// Check if the package provides type definitions and if not
		// check if there is an associated DefinitelyTyped (DT) package.
		const typesRes = yield* Effect.either(packageTypes(pkgJson, subpath));
		if (Either.isLeft(typesRes)) {
			const dtPkgName = yield* findDefinitelyTypedPackage({ pkgName, cwd });
			if (!dtPkgName) {
				yield* Effect.logWarning(`no types: ${pkgId}`);
				return {
					status: "no-types" as const,
					pkgId,
					subpath,
					pkgJson,
					...generatedTimestamp(startTime),
				};
			}
			return {
				status: "definitely-typed" as const,
				pkgId,
				subpath,
				pkgJson,
				dtPkgName,
				...generatedTimestamp(startTime),
			};
		}

		// Check if the DB already has the package API.
		const db = yield* Db;
		yield* Effect.logInfo(`using db: ${db.name}`);
		const getPkgApiRes = yield* Effect.either(db.getPackageApi({ pkg, subpath }));
		if (Either.isLeft(getPkgApiRes)) {
			yield* Effect.logWarning(getPkgApiRes.left);
		} else {
			yield* Effect.logInfo(`db has package api for: ${pkgId}`);
			const pkgApi = getPkgApiRes.right;
			return {
				status: "with-api" as const,
				pkgId,
				subpath,
				pkgJson,
				pkgApi,
				...generatedTimestamp(startTime),
			};
		}

		// Extract the package API.
		const pkgApiRes = yield* Effect.either(extractPackageApi({ pkg, subpath }));
		if (Either.isLeft(pkgApiRes)) {
			yield* Effect.logError(pkgApiRes.left);
			return {
				status: "no-api" as const,
				pkgId,
				subpath,
				pkgJson,
				...generatedTimestamp(startTime),
			};
		}
		const pkgApi = pkgApiRes.right;

		// Store the package API in the DB.
		const setPkgApiRes = yield* Effect.either(db.setPackageApi({ pkg, subpath, pkgApi }));
		if (Either.isLeft(setPkgApiRes)) {
			yield* Effect.logError(setPkgApiRes.left);
		} else {
			yield* Effect.logInfo(`db set package api for: ${pkgId}`);
		}

		// Return data for rendering.
		return {
			status: "with-api" as const,
			pkgId,
			subpath,
			pkgJson,
			pkgApi,
			...generatedTimestamp(startTime),
		};
	});

const generatedTimestamp = (startTime: number) => ({
	generatedAt: new Date().toISOString(),
	generatedIn: Math.round(performance.now() - startTime),
});
