import { expect, test } from "vitest";
import { packagePagePath } from "./package-page-path";

test("bare package, root subpath", () => {
	expect(
		packagePagePath({ resolvedPkg: "foo", subpath: "." }),
	).toMatchInlineSnapshot(`"/package/foo"`);
});

test("scoped package, root subpath", () => {
	expect(
		packagePagePath({ resolvedPkg: "@foo/bar", subpath: "." }),
	).toMatchInlineSnapshot(`"/package/@foo/bar"`);
});

test("bare package, other subpath", () => {
	expect(
		packagePagePath({ resolvedPkg: "foo", subpath: "my/subpath" }),
	).toMatchInlineSnapshot(`"/package/foo/my/subpath"`);
});

test("scoped package, other subpath", () => {
	expect(
		packagePagePath({ resolvedPkg: "@foo/bar", subpath: "my/subpath" }),
	).toMatchInlineSnapshot(`"/package/@foo/bar/my/subpath"`);
});
