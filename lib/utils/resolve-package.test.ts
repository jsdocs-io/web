import { expect, test } from "vitest";
import { resolvePackage } from "./resolve-package";

test("bare name", () => {
	expect(resolvePackage("foo", ["foo@1.0.0", "bar@1.0.0", "@foo/bar@1.0.0"])).toMatchInlineSnapshot(
		`"foo@1.0.0"`,
	);
});

test("scoped name", () => {
	expect(
		resolvePackage("@foo/bar", ["foo@1.0.0", "bar@1.0.0", "@foo/bar@1.0.0"]),
	).toMatchInlineSnapshot(`"@foo/bar@1.0.0"`);
});
