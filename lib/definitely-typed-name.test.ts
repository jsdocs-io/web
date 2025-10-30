import { expect, test } from "vitest";
import { definitelyTypedName } from "./definitely-typed-name";

test("definitelyTypedName", () => {
	expect(definitelyTypedName("foo")).toBe("@types/foo");
	expect(definitelyTypedName("@foo/bar")).toBe("@types/foo__bar");
	expect(definitelyTypedName("@types/foo")).toBe("@types/foo");
});
