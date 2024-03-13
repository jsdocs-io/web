import { Effect } from "effect";
import { temporaryDirectoryTask } from "tempy";
import { expect, test } from "vitest";
import {
	findDefinitelyTypedPackage,
	type FindDefinitelyTypedPackageOptions,
} from "./find-definitely-typed-package";

const _findDefinitelyTypedPackage = (opts: FindDefinitelyTypedPackageOptions) =>
	Effect.runPromise(findDefinitelyTypedPackage(opts));

test("deprecated DT package", async () => {
	await temporaryDirectoryTask(async (cwd) => {
		await expect(
			_findDefinitelyTypedPackage({ pkgName: "@types/prettier", cwd }),
		).resolves.toBeUndefined();
	});
});

test("DT package not found", async () => {
	await temporaryDirectoryTask(async (cwd) => {
		await expect(
			_findDefinitelyTypedPackage({ pkgName: "@types/jsdocs-io__not-found", cwd }),
		).resolves.toBeUndefined();
	});
});

test("DT package found", async () => {
	await temporaryDirectoryTask(async (cwd) => {
		await expect(
			_findDefinitelyTypedPackage({ pkgName: "react", cwd }),
		).resolves.toMatchInlineSnapshot(`"@types/react"`);
	});
});
