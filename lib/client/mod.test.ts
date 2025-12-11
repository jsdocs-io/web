import { expect, test } from "vitest";
import { mod } from "./mod";

test("mod", () => {
	expect(mod(-4, 3)).toBe(2);
	expect(mod(-3, 3)).toBe(0);
	expect(mod(-2, 3)).toBe(1);
	expect(mod(-1, 3)).toBe(2);
	expect(mod(0, 3)).toBe(0);
	expect(mod(1, 3)).toBe(1);
	expect(mod(2, 3)).toBe(2);
	expect(mod(3, 3)).toBe(0);
	expect(mod(4, 3)).toBe(1);
});

test("silence error", () => {
	expect(mod(-1, 0)).toBe(0);
	expect(mod(0, 0)).toBe(0);
	expect(mod(1, 0)).toBe(0);
	expect(mod(5, 0)).toBe(0);
});
