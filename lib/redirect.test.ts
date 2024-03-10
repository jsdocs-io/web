import { expect, test } from "vitest";
import { redirect } from "./redirect";

test("redirect", () => {
	const res = redirect("/foo");
	expect(res.status).toMatchInlineSnapshot(`302`);
	expect(res.headers.get("location")).toMatchInlineSnapshot(`"/foo"`);
});
