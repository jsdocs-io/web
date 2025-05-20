import { expect, test } from "vitest";
import { fencedCodeToHtml } from "./fenced-code-to-html";

test("fencedCodeToHtml", async () => {
	await expect(fencedCodeToHtml("const foo: Bar;", "typescript")).resolves.toMatchInlineSnapshot(
		`"<pre class="shiki shiki-themes github-light github-dark" style="background-color:#f7f7f7;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> foo</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Bar</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre>"`,
	);
});

test("unknown language", async () => {
	await expect(fencedCodeToHtml("foo", "unknown")).resolves.toMatchInlineSnapshot(
		`"<pre class="shiki shiki-themes github-light github-dark" style="background-color:#f7f7f7;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span>foo</span></span></code></pre>"`,
	);
});
