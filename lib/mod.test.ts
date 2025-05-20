import { expect, test } from "vitest";
import { mod } from "./mod";

test("mod", async () => {
	expect(mod(5, 3)).toBe(2);
});
