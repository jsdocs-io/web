import { expect, test } from "vitest";
import { packagePageHandler } from "./package-page-handler";

test("no slug", async () => {
	await expect(packagePageHandler()).resolves.toBeInstanceOf(Response);
});

test("invalid slug", async () => {
	await expect(packagePageHandler(".")).resolves.toBeInstanceOf(Response);
});

test("package not found", async () => {
	await expect(packagePageHandler("@jsdocs-io/not-found")).resolves.toBeInstanceOf(Response);
});

test("package version not found", async () => {
	await expect(packagePageHandler("@jsdocs-io/extractor@999.0.0")).resolves.toBeInstanceOf(
		Response,
	);
});

test("redirect to fixed package version", async () => {
	await expect(packagePageHandler("preact")).resolves.toBeInstanceOf(Response);
});

test("invalid license", async () => {
	await expect(packagePageHandler("unlicensed@0.4.0")).resolves.toMatchObject({
		status: "invalid-license",
		pkgJson: {
			_id: "unlicensed@0.4.0",
			name: "unlicensed",
			version: "0.4.0",
			license: "UNLICENSED",
		},
	});
});

test("no types", async () => {
	await expect(packagePageHandler("@types/prettier@3.0.0")).resolves.toMatchObject({
		status: "no-types",
		pkgJson: {
			_id: "@types/prettier@3.0.0",
			name: "@types/prettier",
			version: "3.0.0",
		},
	});
});

test("no subpath", async () => {
	await expect(packagePageHandler("preact@10.20.0/not/found")).resolves.toMatchObject({
		status: "no-types",
		pkgJson: {
			_id: "preact@10.20.0",
			name: "preact",
			version: "10.20.0",
		},
	});
});

test("definitely typed", async () => {
	await expect(packagePageHandler("react@18.2.0")).resolves.toMatchObject({
		status: "definitely-typed",
		pkgJson: {
			_id: "react@18.2.0",
			name: "react",
			version: "18.2.0",
		},
	});
});

test("with api", async () => {
	await expect(packagePageHandler("short-time-ago@2.0.0")).resolves.toMatchObject({
		status: "with-api",
		pkgJson: {
			_id: "short-time-ago@2.0.0",
			name: "short-time-ago",
			version: "2.0.0",
		},
	});
	await expect(packagePageHandler("short-time-ago@2.0.0")).resolves.toMatchObject({
		status: "with-api",
		pkgJson: {
			_id: "short-time-ago@2.0.0",
			name: "short-time-ago",
			version: "2.0.0",
		},
	});
});
