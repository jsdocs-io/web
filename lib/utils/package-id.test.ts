import { expect, test } from "vitest";
import { packageId } from "./package-id";

test("bare package, root subpath", () => {
	expect(packageId("foo", ".")).toMatchInlineSnapshot(`"foo"`);
});

test("scoped package, root subpath", () => {
	expect(packageId("@foo/bar", ".")).toMatchInlineSnapshot(`"@foo/bar"`);
});

test("bare package, other subpath", () => {
	expect(packageId("foo", "my/subpath")).toMatchInlineSnapshot(`"foo/my/subpath"`);
});

test("scoped package, other subpath", () => {
	expect(packageId("@foo/bar", "my/subpath")).toMatchInlineSnapshot(`"@foo/bar/my/subpath"`);
});
