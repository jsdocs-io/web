import { Effect } from "effect";
import { expect, test } from "vitest";
import { parsePackageSlug } from "./parse-package-slug";

const _parsePackageSlug = (slug: string) =>
	Effect.runPromise(parsePackageSlug(slug));

test("empty slug", async () => {
	await expect(_parsePackageSlug("")).rejects.toThrow();
});

test("only slash", async () => {
	await expect(_parsePackageSlug("/")).rejects.toThrow();
});

test("only slashes", async () => {
	await expect(_parsePackageSlug("///")).rejects.toThrow();
});

test("invalid bare name", async () => {
	await expect(_parsePackageSlug(".foo")).rejects.toThrow();
});

test("invalid scope marker", async () => {
	await expect(_parsePackageSlug("@")).rejects.toThrow();
});

test("multiple at signs", async () => {
	await expect(_parsePackageSlug("@@@")).rejects.toThrow();
});

test("at signs and slashes", async () => {
	await expect(_parsePackageSlug("/@@/")).rejects.toThrow();
	await expect(_parsePackageSlug("@///")).rejects.toThrow();
	await expect(_parsePackageSlug("@/@/@")).rejects.toThrow();
});

test("invalid scoped name", async () => {
	await expect(_parsePackageSlug("@/bar")).rejects.toThrow();
});

test("invalid scope without scoped name", async () => {
	await expect(_parsePackageSlug("@foo")).rejects.toThrow();
});

test("valid bare name", async () => {
	await expect(_parsePackageSlug("foo")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name", async () => {
	await expect(_parsePackageSlug("@foo/bar")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("invalid bare name with version", async () => {
	await expect(_parsePackageSlug(".foo@1.0.0")).rejects.toThrow();
});

test("invalid scope marker with version", async () => {
	await expect(_parsePackageSlug("@1.0.0")).rejects.toThrow();
});

test("invalid scoped name with version", async () => {
	await expect(_parsePackageSlug("@/bar@1.0.0")).rejects.toThrow();
});

test("valid bare name with version", async () => {
	await expect(_parsePackageSlug("foo@1.0.0")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with version", async () => {
	await expect(_parsePackageSlug("@foo/bar@1.0.0")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "subpath": ".",
		}
	`);
});

test("invalid bare name with subpath", async () => {
	await expect(_parsePackageSlug(".foo/my/sub/path")).rejects.toThrow();
});

test("invalid scope marker with subpath", async () => {
	await expect(_parsePackageSlug("@/my/sub/path")).rejects.toThrow();
});

test("invalid scoped name with subpath", async () => {
	await expect(_parsePackageSlug("@/bar/my/sub/path")).rejects.toThrow();
});

test("valid bare name with subpath", async () => {
	await expect(_parsePackageSlug("foo/my/sub/path")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with subpath", async () => {
	await expect(_parsePackageSlug("@foo/bar/my/sub/path")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with same name subpath", async () => {
	await expect(_parsePackageSlug("foo/foo")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with same name subpath", async () => {
	await expect(_parsePackageSlug("@foo/bar/@foo/bar")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with version and subpath", async () => {
	await expect(_parsePackageSlug("foo@1.0.0/my/sub/path")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with version and subpath", async () => {
	await expect(_parsePackageSlug("@foo/bar@1.0.0/my/sub/path")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with version and same name subpath", async () => {
	await expect(_parsePackageSlug("foo@1.0.0/foo")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with version and same name subpath", async () => {
	await expect(_parsePackageSlug("@foo/bar@1.0.0/@foo/bar")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with version range and subpath", async () => {
	await expect(_parsePackageSlug("foo@^1/my/sub/path")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@^1",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with version range and subpath", async () => {
	await expect(_parsePackageSlug("@foo/bar@^1/my/sub/path")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@^1",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with tag and subpath", async () => {
	await expect(_parsePackageSlug("foo@latest/my/sub/path")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@latest",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with tag and subpath", async () => {
	await expect(_parsePackageSlug("@foo/bar@latest/my/sub/path")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@latest",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with trailing slash", async () => {
	await expect(_parsePackageSlug("foo/")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with trailing slash", async () => {
	await expect(_parsePackageSlug("@foo/bar/")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with version and trailing slash", async () => {
	await expect(_parsePackageSlug("foo@1.0.0/")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with version and trailing slash", async () => {
	await expect(_parsePackageSlug("@foo/bar@1.0.0/")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with trailing slashes", async () => {
	await expect(_parsePackageSlug("foo///")).resolves.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with trailing slashes", async () => {
	await expect(_parsePackageSlug("@foo/bar///")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with subpath with too much slashes", async () => {
	await expect(_parsePackageSlug("foo//my//sub//path")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with subpath with too much slashes", async () => {
	await expect(_parsePackageSlug("@foo/bar//my//sub//path")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("wrong scoped name steals subpath", async () => {
	await expect(_parsePackageSlug("@foo/my/sub/path")).resolves
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/my",
		  "subpath": "sub/path",
		}
	`);
});
