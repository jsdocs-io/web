import { expect, test } from "vitest";
import { parsePackageSlug } from "./parse-package-slug";

test("empty slug", () => {
	expect(parsePackageSlug("").isErr()).toBe(true);
});

test("only slash", () => {
	expect(parsePackageSlug("/").isErr()).toBe(true);
});

test("only slashes", () => {
	expect(parsePackageSlug("///").isErr()).toBe(true);
});

test("invalid bare name", () => {
	expect(parsePackageSlug(".foo").isErr()).toBe(true);
});

test("invalid scope marker", () => {
	expect(parsePackageSlug("@").isErr()).toBe(true);
});

test("invalid scoped name", () => {
	expect(parsePackageSlug("@/bar").isErr()).toBe(true);
});

test("invalid scope without scoped name", () => {
	expect(parsePackageSlug("@foo").isErr()).toBe(true);
});

test("valid bare name", () => {
	expect(parsePackageSlug("foo").isOk()).toBe(true);
	expect(parsePackageSlug("foo")._unsafeUnwrap()).toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name", () => {
	expect(parsePackageSlug("@foo/bar").isOk()).toBe(true);
	expect(parsePackageSlug("@foo/bar")._unsafeUnwrap()).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("invalid bare name with version", () => {
	expect(parsePackageSlug(".foo@1.0.0").isErr()).toBe(true);
});

test("invalid scope marker with version", () => {
	expect(parsePackageSlug("@1.0.0").isErr()).toBe(true);
});

test("invalid scoped name with version", () => {
	expect(parsePackageSlug("@/bar@1.0.0").isErr()).toBe(true);
});

test("valid bare name with version", () => {
	expect(parsePackageSlug("foo@1.0.0").isOk()).toBe(true);
	expect(parsePackageSlug("foo@1.0.0")._unsafeUnwrap()).toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with version", () => {
	expect(parsePackageSlug("@foo/bar@1.0.0").isOk()).toBe(true);
	expect(parsePackageSlug("@foo/bar@1.0.0")._unsafeUnwrap())
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "subpath": ".",
		}
	`);
});

test("invalid bare name with subpath", () => {
	expect(parsePackageSlug(".foo/my/sub/path").isErr()).toBe(true);
});

test("invalid scope marker with subpath", () => {
	expect(parsePackageSlug("@/my/sub/path").isErr()).toBe(true);
});

test("invalid scoped name with subpath", () => {
	expect(parsePackageSlug("@/bar/my/sub/path").isErr()).toBe(true);
});

test("valid bare name with subpath", () => {
	expect(parsePackageSlug("foo/my/sub/path").isOk()).toBe(true);
	expect(parsePackageSlug("foo/my/sub/path")._unsafeUnwrap())
		.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with subpath", () => {
	expect(parsePackageSlug("@foo/bar/my/sub/path").isOk()).toBe(true);
	expect(parsePackageSlug("@foo/bar/my/sub/path")._unsafeUnwrap())
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with version and subpath", () => {
	expect(parsePackageSlug("foo@1.0.0/my/sub/path").isOk()).toBe(true);
	expect(parsePackageSlug("foo@1.0.0/my/sub/path")._unsafeUnwrap())
		.toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with version and subpath", () => {
	expect(parsePackageSlug("@foo/bar@1.0.0/my/sub/path").isOk()).toBe(true);
	expect(parsePackageSlug("@foo/bar@1.0.0/my/sub/path")._unsafeUnwrap())
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with trailing slash", () => {
	expect(parsePackageSlug("foo/").isOk()).toBe(true);
	expect(parsePackageSlug("foo/")._unsafeUnwrap()).toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with trailing slash", () => {
	expect(parsePackageSlug("@foo/bar/").isOk()).toBe(true);
	expect(parsePackageSlug("@foo/bar/")._unsafeUnwrap()).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with version and trailing slash", () => {
	expect(parsePackageSlug("foo@1.0.0/").isOk()).toBe(true);
	expect(parsePackageSlug("foo@1.0.0/")._unsafeUnwrap()).toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with version and trailing slash", () => {
	expect(parsePackageSlug("@foo/bar@1.0.0/").isOk()).toBe(true);
	expect(parsePackageSlug("@foo/bar@1.0.0/")._unsafeUnwrap())
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with trailing slashes", () => {
	expect(parsePackageSlug("foo///").isOk()).toBe(true);
	expect(parsePackageSlug("foo///")._unsafeUnwrap()).toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with trailing slashes", () => {
	expect(parsePackageSlug("@foo/bar///").isOk()).toBe(true);
	expect(parsePackageSlug("@foo/bar///")._unsafeUnwrap())
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with subpath with too much slashes", () => {
	expect(parsePackageSlug("foo//my//sub//path").isOk()).toBe(true);
	expect(parsePackageSlug("foo//my//sub//path")._unsafeUnwrap())
		.toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with subpath with too much slashes", () => {
	expect(parsePackageSlug("@foo/bar//my//sub//path").isOk()).toBe(true);
	expect(parsePackageSlug("@foo/bar//my//sub//path")._unsafeUnwrap())
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("wrong scoped name steals subpath", () => {
	expect(parsePackageSlug("@foo/my/sub/path").isOk()).toBe(true);
	expect(parsePackageSlug("@foo/my/sub/path")._unsafeUnwrap())
		.toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/my",
		  "subpath": "sub/path",
		}
	`);
});
