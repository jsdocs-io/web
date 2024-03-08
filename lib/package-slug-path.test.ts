import { expect, test } from "vitest";
import { packageSlugPath } from "./package-slug-path";

test("bare package, root subpath", () => {
	expect(
		packageSlugPath({ resolvedPkg: "foo", subpath: "." }),
	).toMatchInlineSnapshot(`"/package/foo"`);
});

test("scoped package, root subpath", () => {
	expect(
		packageSlugPath({ resolvedPkg: "@foo/bar", subpath: "." }),
	).toMatchInlineSnapshot(`"/package/@foo/bar"`);
});

test("bare package, other subpath", () => {
	expect(
		packageSlugPath({ resolvedPkg: "foo", subpath: "my/subpath" }),
	).toMatchInlineSnapshot(`"/package/foo/my/subpath"`);
});

test("scoped package, other subpath", () => {
	expect(
		packageSlugPath({ resolvedPkg: "@foo/bar", subpath: "my/subpath" }),
	).toMatchInlineSnapshot(`"/package/@foo/bar/my/subpath"`);
});
