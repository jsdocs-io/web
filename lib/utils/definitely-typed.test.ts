import { expect, test } from "vitest";
import { getDTPackageName, isDTPackage } from "./definitely-typed";

test("getDTPackageName", () => {
	expect(getDTPackageName("foo")).toBe("@types/foo");
	expect(getDTPackageName("@foo/bar")).toBe("@types/foo__bar");
	expect(getDTPackageName("@types/foo")).toBe("@types/foo");
});

test("isDTPackage", () => {
	expect(isDTPackage("foo")).toBeFalsy();
	expect(isDTPackage("@foo/bar")).toBeFalsy();
	expect(isDTPackage("@types/foo")).toBeTruthy();
});
