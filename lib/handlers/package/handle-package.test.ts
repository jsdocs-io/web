import { expect, test } from "vitest";
import { handlePackage } from "./handle-package";

test("invalid slug", async () => {
	const res = await handlePackage(".");
	expect(res).toMatchInlineSnapshot(`
		{
		  "status": "bad-request",
		}
	`);
});

test("package not found", async () => {
	const res = await handlePackage("@jsdocs-io/not-found");
	expect(res).toMatchInlineSnapshot(`
		{
		  "status": "not-found",
		}
	`);
});

test("package version not found", async () => {
	const res = await handlePackage("@jsdocs-io/extractor@9999");
	expect(res).toMatchInlineSnapshot(`
		{
		  "status": "not-found",
		}
	`);
});

test("redirect to fixed package version", async () => {
	const res = await handlePackage("@jsdoc-io/test-pkg-no-repository");
	expect(res).toMatchInlineSnapshot(`
		{
		  "path": "/package/@jsdoc-io/test-pkg-no-repository@1.0.0",
		  "status": "found",
		}
	`);
});

test("invalid license", async () => {
	const res = await handlePackage("unlicensed@0.4.0");
	expect(res).toMatchObject({
		status: "pkg-has-invalid-license",
		pkgInfo: {
			pkgId: "unlicensed@0.4.0",
		},
	});
});

test("deprecated dt package", async () => {
	const res = await handlePackage("@types/prettier@3.0.0");
	expect(res).toMatchObject({
		status: "pkg-is-deprecated-dt-pkg",
		pkgInfo: {
			pkgId: "@types/prettier@3.0.0",
		},
	});
});

test("subpath not found", async () => {
	const res = await handlePackage("preact@10.20.0/not/found");
	expect(res).toMatchObject({
		status: "pkg-has-no-types",
		pkgInfo: {
			pkgId: "preact@10.20.0/not/found",
		},
	});
});

test("definitely typed", async () => {
	const res = await handlePackage("react@18.2.0");
	expect(res).toMatchObject({
		status: "pkg-has-dt-pkg",
		pkgInfo: {
			pkgId: "react@18.2.0",
		},
	});
});

test("with api", async () => {
	const res = await handlePackage("short-time-ago@2.0.0");
	expect(res).toMatchObject({
		status: "pkg-has-api",
		pkgInfo: {
			pkgId: "short-time-ago@2.0.0",
		},
	});
});
