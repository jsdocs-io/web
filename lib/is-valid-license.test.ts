import { expect, test } from "vitest";
import { isValidLicense } from "./is-valid-license";

test("undefined", () => {
	expect(isValidLicense()).toBe(false);
});

test("empty", () => {
	expect(isValidLicense("")).toBe(false);
});

test("unlicensed", () => {
	expect(isValidLicense("UNLICENSED")).toBe(false);
	expect(isValidLicense("unlicensed")).toBe(false);
});

test("see license", () => {
	expect(isValidLicense("SEE LICENSE IN ...")).toBe(false);
	expect(isValidLicense("see license in ...")).toBe(false);
});

test("some valid licenses", () => {
	expect(isValidLicense("MIT")).toBe(true);
	expect(isValidLicense("Apache-2.0")).toBe(true);
	expect(isValidLicense("MIT AND Apache-2.0")).toBe(true);
	expect(isValidLicense("(ISC OR GPL-3.0)")).toBe(true);
	expect(isValidLicense("MIT OR Apache-2.0")).toBe(true);
	expect(isValidLicense("MIT AND Apache-2.0 OR BSD-3-Clause")).toBe(true);
});
