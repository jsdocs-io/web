import { expect, test } from "vitest";
import { shortKind } from "./short-kind";

test("shortKind", () => {
	expect(shortKind("variable")).toBe("variable");
	expect(shortKind("class-constructor")).toBe("constructor");
	expect(shortKind("interface-call-signature")).toBe("call signature");
});
