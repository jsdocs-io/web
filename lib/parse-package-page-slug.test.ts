import { Effect } from "effect";
import { expect, test } from "vitest";
import { parsePackagePageSlug } from "./parse-package-page-slug";

const _parsePackagePageSlug = (slug?: string) => Effect.runPromise(parsePackagePageSlug(slug));

test("no slug", async () => {
	await expect(_parsePackagePageSlug()).rejects.toThrow();
});

test("undefined slug", async () => {
	await expect(_parsePackagePageSlug(undefined)).rejects.toThrow();
});

test("empty slug", async () => {
	await expect(_parsePackagePageSlug("")).rejects.toThrow();
});

test("only slash", async () => {
	await expect(_parsePackagePageSlug("/")).rejects.toThrow();
});

test("only slashes", async () => {
	await expect(_parsePackagePageSlug("///")).rejects.toThrow();
});

test("invalid bare name", async () => {
	await expect(_parsePackagePageSlug(".foo")).rejects.toThrow();
});

test("invalid scope marker", async () => {
	await expect(_parsePackagePageSlug("@")).rejects.toThrow();
});

test("multiple at signs", async () => {
	await expect(_parsePackagePageSlug("@@@")).rejects.toThrow();
});

test("at signs and slashes", async () => {
	await expect(_parsePackagePageSlug("/@@/")).rejects.toThrow();
	await expect(_parsePackagePageSlug("@///")).rejects.toThrow();
	await expect(_parsePackagePageSlug("@/@/@")).rejects.toThrow();
});

test("invalid scoped name", async () => {
	await expect(_parsePackagePageSlug("@/bar")).rejects.toThrow();
});

test("invalid scope without scoped name", async () => {
	await expect(_parsePackagePageSlug("@foo")).rejects.toThrow();
});

test("valid bare name", async () => {
	await expect(_parsePackagePageSlug("foo")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name", async () => {
	await expect(_parsePackagePageSlug("@foo/bar")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("invalid bare name with version", async () => {
	await expect(_parsePackagePageSlug(".foo@1.0.0")).rejects.toThrow();
});

test("invalid scope marker with version", async () => {
	await expect(_parsePackagePageSlug("@1.0.0")).rejects.toThrow();
});

test("invalid scoped name with version", async () => {
	await expect(_parsePackagePageSlug("@/bar@1.0.0")).rejects.toThrow();
});

test("valid bare name with version", async () => {
	await expect(_parsePackagePageSlug("foo@1.0.0")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with version", async () => {
	await expect(_parsePackagePageSlug("@foo/bar@1.0.0")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("invalid bare name with subpath", async () => {
	await expect(_parsePackagePageSlug(".foo/my/sub/path")).rejects.toThrow();
});

test("invalid scope marker with subpath", async () => {
	await expect(_parsePackagePageSlug("@/my/sub/path")).rejects.toThrow();
});

test("invalid scoped name with subpath", async () => {
	await expect(_parsePackagePageSlug("@/bar/my/sub/path")).rejects.toThrow();
});

test("valid bare name with subpath", async () => {
	await expect(_parsePackagePageSlug("foo/my/sub/path")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "pkgName": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with subpath", async () => {
	await expect(_parsePackagePageSlug("@foo/bar/my/sub/path")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "pkgName": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with same name subpath", async () => {
	await expect(_parsePackagePageSlug("foo/foo")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with same name subpath", async () => {
	await expect(_parsePackagePageSlug("@foo/bar/@foo/bar")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with version and subpath", async () => {
	await expect(_parsePackagePageSlug("foo@1.0.0/my/sub/path")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "pkgName": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with version and subpath", async () => {
	await expect(_parsePackagePageSlug("@foo/bar@1.0.0/my/sub/path")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "pkgName": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with version and same name subpath", async () => {
	await expect(_parsePackagePageSlug("foo@1.0.0/foo")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with version and same name subpath", async () => {
	await expect(_parsePackagePageSlug("@foo/bar@1.0.0/@foo/bar")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with version range and subpath", async () => {
	await expect(_parsePackagePageSlug("foo@^1/my/sub/path")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@^1",
		  "pkgName": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with version range and subpath", async () => {
	await expect(_parsePackagePageSlug("@foo/bar@^1/my/sub/path")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@^1",
		  "pkgName": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with tag and subpath", async () => {
	await expect(_parsePackagePageSlug("foo@latest/my/sub/path")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@latest",
		  "pkgName": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with tag and subpath", async () => {
	await expect(_parsePackagePageSlug("@foo/bar@latest/my/sub/path")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@latest",
		  "pkgName": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with trailing slash", async () => {
	await expect(_parsePackagePageSlug("foo/")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with trailing slash", async () => {
	await expect(_parsePackagePageSlug("@foo/bar/")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with version and trailing slash", async () => {
	await expect(_parsePackagePageSlug("foo@1.0.0/")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with version and trailing slash", async () => {
	await expect(_parsePackagePageSlug("@foo/bar@1.0.0/")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with trailing slashes", async () => {
	await expect(_parsePackagePageSlug("foo///")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with trailing slashes", async () => {
	await expect(_parsePackagePageSlug("@foo/bar///")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with subpath with too much slashes", async () => {
	await expect(_parsePackagePageSlug("foo//my//sub//path")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "pkgName": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with subpath with too much slashes", async () => {
	await expect(_parsePackagePageSlug("@foo/bar//my//sub//path")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "pkgName": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("wrong scoped name steals subpath", async () => {
	await expect(_parsePackagePageSlug("@foo/my/sub/path")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/my",
		  "pkgName": "@foo/my",
		  "subpath": "sub/path",
		}
	`);
});
