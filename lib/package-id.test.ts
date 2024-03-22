import { expect, test } from "vitest";
import { packageId } from "./package-id";

test("bare package, root subpath", () => {
	expect(packageId({ pkg: "foo", subpath: "." })).toMatchInlineSnapshot(`"foo"`);
});

test("scoped package, root subpath", () => {
	expect(packageId({ pkg: "@foo/bar", subpath: "." })).toMatchInlineSnapshot(`"@foo/bar"`);
});

test("bare package, other subpath", () => {
	expect(packageId({ pkg: "foo", subpath: "my/subpath" })).toMatchInlineSnapshot(
		`"foo/my/subpath"`,
	);
});

test("scoped package, other subpath", () => {
	expect(packageId({ pkg: "@foo/bar", subpath: "my/subpath" })).toMatchInlineSnapshot(
		`"@foo/bar/my/subpath"`,
	);
});
