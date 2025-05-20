import { expect, test } from "vitest";
import { shortId } from "./short-id";

test("shortId", () => {
	expect(shortId("+function.foo")).toBe("foo");
});
