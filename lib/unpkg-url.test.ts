import { expect, test } from "vitest";
import { makeUnpkgUrl } from "./unpkg-url";

test("unpkgUrl", () => {
	const unpkgUrl = makeUnpkgUrl(["foo@1.0.0"]);
	expect(
		unpkgUrl({
			kind: "variable",
			id: "foo",
			name: "foo",
			docs: [],
			file: "/foo/foo.ts",
			line: 123,
			signature: "const foo: Foo;",
		}),
	).toMatchInlineSnapshot(`"https://unpkg.com/browse/foo@1.0.0/foo.ts#L123"`);
	expect(
		unpkgUrl({
			kind: "variable",
			id: "bar",
			name: "bar",
			docs: [],
			file: "/bar/bar.ts",
			line: 123,
			signature: "const bar: Bar;",
		}),
	).toMatchInlineSnapshot(`"https://unpkg.com/browse/bar/bar.ts#L123"`);
});
