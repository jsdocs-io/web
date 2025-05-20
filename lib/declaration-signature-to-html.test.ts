import { expect, test } from "vitest";
import { declarationSignatureToHtml } from "./declaration-signature-to-html";

test("variable", async () => {
	await expect(
		declarationSignatureToHtml(
			{
				kind: "variable",
				id: "foo",
				name: "foo",
				docs: [],
				file: "foo.ts",
				line: 123,
				signature: "const foo: Bar;",
			},
			(s) => (s === "Bar" ? "bar.ts#L789" : undefined),
		),
	).resolves.toMatchInlineSnapshot(
		`"<pre class="shiki shiki-themes github-light github-dark" style="background-color:#f7f7f7;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> </span><span style="color:#005CC5;--shiki-dark:#79B8FF">foo</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> </span><a style="color:#6F42C1;--shiki-dark:#B392F0" href="bar.ts#L789">Bar</a><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre>"`,
	);
});

test("class constructor", async () => {
	await expect(
		declarationSignatureToHtml(
			{
				kind: "class-constructor",
				id: "Foo.constructor",
				name: "constructor",
				docs: [],
				file: "foo.ts",
				line: 123,
				signature: "constructor() {}",
			},
			() => undefined,
		),
	).resolves.toMatchInlineSnapshot(
		`"<pre class="shiki shiki-themes github-light github-dark" style="background-color:#f7f7f7;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">constructor</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {}</span></span></code></pre>"`,
	);
});

test("class property", async () => {
	await expect(
		declarationSignatureToHtml(
			{
				kind: "class-property",
				id: "Foo.bar",
				name: "bar",
				docs: [],
				file: "foo.ts",
				line: 123,
				signature: "readonly bar: Bar;",
			},
			(s) => (s === "Bar" ? "bar.ts#L789" : undefined),
		),
	).resolves.toMatchInlineSnapshot(
		`"<pre class="shiki shiki-themes github-light github-dark" style="background-color:#f7f7f7;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">readonly</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> </span><span style="color:#E36209;--shiki-dark:#FFAB70">bar</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> </span><a style="color:#6F42C1;--shiki-dark:#B392F0" href="bar.ts#L789">Bar</a><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre>"`,
	);
});

test("don't link from function parameter name", async () => {
	await expect(
		declarationSignatureToHtml(
			{
				kind: "function",
				id: "foo",
				name: "foo",
				docs: [],
				file: "foo.ts",
				line: 123,
				signature: "(bar: Bar) => Bar;",
			},
			(s) => (s.toLowerCase() === "bar" ? "bar.ts#L789" : undefined),
		),
	).resolves.toMatchInlineSnapshot(
		`"<pre class="shiki shiki-themes github-light github-dark" style="background-color:#f7f7f7;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#E36209;--shiki-dark:#FFAB70">bar</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> </span><a style="color:#6F42C1;--shiki-dark:#B392F0" href="bar.ts#L789">Bar</a><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=&gt;</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> </span><a style="color:#6F42C1;--shiki-dark:#B392F0" href="bar.ts#L789">Bar</a><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre>"`,
	);
});

test("signature too long", async () => {
	await expect(
		declarationSignatureToHtml(
			{
				kind: "variable",
				id: "foo",
				name: "foo",
				docs: [],
				file: "foo.ts",
				line: 123,
				signature: "a".repeat(4000),
			},
			() => undefined,
		),
	).resolves.toBeDefined();
});

test("empty signature", async () => {
	await expect(
		declarationSignatureToHtml(
			{
				kind: "variable",
				id: "foo",
				name: "foo",
				docs: [],
				file: "foo.ts",
				line: 123,
				signature: "",
			},
			() => undefined,
		),
	).resolves.toMatchInlineSnapshot(
		`"<pre class="shiki shiki-themes github-light github-dark" style="background-color:#f7f7f7;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"></span></code></pre>"`,
	);
});
