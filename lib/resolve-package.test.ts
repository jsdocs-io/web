import { Effect } from "effect";
import { expect, test } from "vitest";
import { resolvePackage, type ResolvePackageOptions } from "./resolve-package";

const _resolvePackage = (opts: ResolvePackageOptions) =>
	Effect.runPromise(Effect.scoped(resolvePackage(opts)));

test("package not found", async () => {
	await expect(
		_resolvePackage({
			pkg: "@jsdocs-io/this-package-does-not-exist@latest",
			pkgName: "@jsdocs-io/this-package-does-not-exist",
		}),
	).rejects.toThrow();
});

test("package version not found", async () => {
	await expect(
		_resolvePackage({
			pkg: "@jsdocs-io/extractor@999.0.0",
			pkgName: "@jsdocs-io/extractor",
		}),
	).rejects.toThrow();
});

test("package range not found", async () => {
	await expect(
		_resolvePackage({
			pkg: "@jsdocs-io/extractor@^999",
			pkgName: "@jsdocs-io/extractor",
		}),
	).rejects.toThrow();
});

test("package tag not found", async () => {
	await expect(
		_resolvePackage({
			pkg: "@jsdocs-io/extractor@this-tag-does-not-exist",
			pkgName: "@jsdocs-io/extractor",
		}),
	).rejects.toThrow();
});

test("package version found", async () => {
	await expect(
		_resolvePackage({
			pkg: "@jsdocs-io/extractor@0.4.0",
			pkgName: "@jsdocs-io/extractor",
		}),
	).resolves.toMatchInlineSnapshot(`"@jsdocs-io/extractor@0.4.0"`);
});

test("package range found", async () => {
	await expect(
		_resolvePackage({
			pkg: "@jsdocs-io/extractor@^0",
			pkgName: "@jsdocs-io/extractor",
		}),
	).resolves.toMatchInlineSnapshot(`"@jsdocs-io/extractor@0.4.0"`);
});
