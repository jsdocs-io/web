import { goTry } from "go-go-try";
import { expect, test } from "vitest";
import { parsePackageSlug } from "./parse-package-slug";

test("empty slug", () => {
	const [err, _] = goTry(() => parsePackageSlug(""));
	expect(err).toBeDefined();
});

test("only slash", () => {
	const [err, _] = goTry(() => parsePackageSlug("/"));
	expect(err).toBeDefined();
});

test("only slashes", () => {
	const [err, _] = goTry(() => parsePackageSlug("///"));
	expect(err).toBeDefined();
});

test("invalid bare name", () => {
	const [err, _] = goTry(() => parsePackageSlug(".foo"));
	expect(err).toBeDefined();
});

test("invalid scope marker", () => {
	const [err, _] = goTry(() => parsePackageSlug("@"));
	expect(err).toBeDefined();
});

test("multiple at signs", () => {
	const [err, _] = goTry(() => parsePackageSlug("@@@"));
	expect(err).toBeDefined();
});

test("at signs and slashes", () => {
	const [err, _] = goTry(() => parsePackageSlug("/@@/"));
	const [err1, _1] = goTry(() => parsePackageSlug("@///"));
	const [err2, _2] = goTry(() => parsePackageSlug("@/@/@"));
	expect(err).toBeDefined();
	expect(err1).toBeDefined();
	expect(err2).toBeDefined();
});

test("invalid scoped name", () => {
	const [err, _] = goTry(() => parsePackageSlug("@/bar"));
	expect(err).toBeDefined();
});

test("invalid scope without scoped name", () => {
	const [err, _] = goTry(() => parsePackageSlug("@foo"));
	expect(err).toBeDefined();
});

test("valid bare name", () => {
	const [err, res] = goTry(() => parsePackageSlug("foo"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/bar"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("invalid bare name with version", () => {
	const [err, _] = goTry(() => parsePackageSlug(".foo@1.0.0"));
	expect(err).toBeDefined();
});

test("invalid scope marker with version", () => {
	const [err, _] = goTry(() => parsePackageSlug("@1.0.0"));
	expect(err).toBeDefined();
});

test("invalid scoped name with version", () => {
	const [err, _] = goTry(() => parsePackageSlug("@/bar@1.0.0"));
	expect(err).toBeDefined();
});

test("valid bare name with version", () => {
	const [err, res] = goTry(() => parsePackageSlug("foo@1.0.0"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with version", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/bar@1.0.0"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("invalid bare name with subpath", () => {
	const [err, _] = goTry(() => parsePackageSlug(".foo/my/sub/path"));
	expect(err).toBeDefined();
});

test("invalid scope marker with subpath", () => {
	const [err, _] = goTry(() => parsePackageSlug("@/my/sub/path"));
	expect(err).toBeDefined();
});

test("invalid scoped name with subpath", () => {
	const [err, _] = goTry(() => parsePackageSlug("@/bar/my/sub/path"));
	expect(err).toBeDefined();
});

test("valid bare name with subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("foo/my/sub/path"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "pkgName": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/bar/my/sub/path"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "pkgName": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with same name subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("foo/foo"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with same name subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/bar/@foo/bar"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with version and subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("foo@1.0.0/my/sub/path"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "pkgName": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with version and subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/bar@1.0.0/my/sub/path"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "pkgName": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with version and subpath with spaces", () => {
	const [err, res] = goTry(() => parsePackageSlug(" foo @ 1.0.0 / my / sub / path "));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "pkgName": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with version and subpath with spaces", () => {
	const [err, res] = goTry(() => parsePackageSlug(" @foo / bar @ 1.0.0 / my / sub / path "));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "pkgName": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with version and same name subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("foo@1.0.0/foo"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with version and same name subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/bar@1.0.0/@foo/bar"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with version range and subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("foo@^1/my/sub/path"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo@^1",
		  "pkgName": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with version range and subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/bar@^1/my/sub/path"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@^1",
		  "pkgName": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with tag and subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("foo@latest/my/sub/path"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo@latest",
		  "pkgName": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with tag and subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/bar@latest/my/sub/path"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@latest",
		  "pkgName": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid bare name with trailing slash", () => {
	const [err, res] = goTry(() => parsePackageSlug("foo/"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with trailing slash", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/bar/"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with version and trailing slash", () => {
	const [err, res] = goTry(() => parsePackageSlug("foo@1.0.0/"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo@1.0.0",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with version and trailing slash", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/bar@1.0.0/"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar@1.0.0",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with trailing slashes", () => {
	const [err, res] = goTry(() => parsePackageSlug("foo///"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "pkgName": "foo",
		  "subpath": ".",
		}
	`);
});

test("valid scoped name with trailing slashes", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/bar///"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "pkgName": "@foo/bar",
		  "subpath": ".",
		}
	`);
});

test("valid bare name with subpath with too many slashes", () => {
	const [err, res] = goTry(() => parsePackageSlug("foo//my//sub//path"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "foo",
		  "pkgName": "foo",
		  "subpath": "my/sub/path",
		}
	`);
});

test("valid scoped name with subpath with too many slashes", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/bar//my//sub//path"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/bar",
		  "pkgName": "@foo/bar",
		  "subpath": "my/sub/path",
		}
	`);
});

test("wrong scoped name steals subpath", () => {
	const [err, res] = goTry(() => parsePackageSlug("@foo/my/sub/path"));
	expect(err).toBeUndefined();
	expect(res).toMatchInlineSnapshot(`
		{
		  "pkg": "@foo/my",
		  "pkgName": "@foo/my",
		  "subpath": "sub/path",
		}
	`);
});

test("invalid git dependencies", () => {
	// Git dependencies are supported by bun but not by jsdocs.io.
	const [err1] = goTry(() => parsePackageSlug("git+http://github.com/user/repo.git"));
	const [err2] = goTry(() => parsePackageSlug("git+https://github.com/user/repo.git"));
	const [err3] = goTry(() => parsePackageSlug("git+ssh://github.com/user/repo.git#1.0.0"));
	const [err4] = goTry(() => parsePackageSlug("git://github.com:user/repo.git"));
	const [err5] = goTry(() => parsePackageSlug("git@github.com:user/repo.git"));
	const [err6] = goTry(() => parsePackageSlug("github:user/repo"));
	const [err7] = goTry(() => parsePackageSlug("gitlab:user/repo"));
	const [err8] = goTry(() => parsePackageSlug("bitbucket:user/repo"));
	expect(err1).toBeDefined();
	expect(err2).toBeDefined();
	expect(err3).toBeDefined();
	expect(err4).toBeDefined();
	expect(err5).toBeDefined();
	expect(err6).toBeDefined();
	expect(err7).toBeDefined();
	expect(err8).toBeDefined();
});

test("invalid tarball dependencies", () => {
	// Tarball dependencies are supported by bun but not by jsdocs.io.
	const [err] = goTry(() => parsePackageSlug("foo@https://example.com/foo.tgz"));
	expect(err).toBeDefined();
});

test("invalid path dependencies", () => {
	const [err1] = goTry(() => parsePackageSlug("../some/path"));
	const [err2] = goTry(() => parsePackageSlug("./some/path"));
	const [err3] = goTry(() => parsePackageSlug("~/some/path"));
	const [err4] = goTry(() => parsePackageSlug("/some/path"));
	expect(err1).toBeDefined();
	expect(err2).toBeDefined();
	expect(err3).toBeDefined();
	expect(err4).toBeDefined();
});

test("invalid file dependencies", () => {
	const [err1] = goTry(() => parsePackageSlug("file:../some/path"));
	const [err2] = goTry(() => parsePackageSlug("file:./some/path"));
	const [err3] = goTry(() => parsePackageSlug("file:~/some/path"));
	const [err4] = goTry(() => parsePackageSlug("file:/some/path"));
	expect(err1).toBeDefined();
	expect(err2).toBeDefined();
	expect(err3).toBeDefined();
	expect(err4).toBeDefined();
});
