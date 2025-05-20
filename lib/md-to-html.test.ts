import { expect, test } from "vitest";
import { mdToHtml } from "./md-to-html";

test("mdToHtml", async () => {
	await expect(mdToHtml("**hello**")).resolves.toMatchInlineSnapshot(`"<strong>hello</strong>"`);
});
