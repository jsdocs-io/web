import { goTry } from "go-go-try";
import { expect, test } from "vitest";
import { checkLicense } from "./check-license";

test("undefined", () => {
	const [err] = goTry(() => checkLicense());
	expect(err).toBeDefined();
});

test("empty", () => {
	const [err] = goTry(() => checkLicense(""));
	expect(err).toBeDefined();
});

test("unlicensed", () => {
	const [err1] = goTry(() => checkLicense("UNLICENSED"));
	const [err2] = goTry(() => checkLicense("unlicensed"));
	expect(err1).toBeDefined();
	expect(err2).toBeDefined();
});

test("see license in ...", () => {
	const [err1] = goTry(() => checkLicense("SEE LICENSE IN ..."));
	const [err2] = goTry(() => checkLicense("see license in ..."));
	const [err3] = goTry(() => checkLicense("See license in ..."));
	expect(err1).toBeDefined();
	expect(err2).toBeDefined();
	expect(err3).toBeDefined();
});

test("valid licenses", () => {
	const [err1] = goTry(() => checkLicense("MIT"));
	const [err2] = goTry(() => checkLicense("Apache-2.0"));
	const [err3] = goTry(() => checkLicense("MIT AND Apache-2.0"));
	const [err4] = goTry(() => checkLicense("(ISC OR GPL-4.0)"));
	expect(err1).toBeUndefined();
	expect(err2).toBeUndefined();
	expect(err3).toBeUndefined();
	expect(err4).toBeUndefined();
});
