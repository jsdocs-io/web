import { expect, test } from "vitest";
import { makeDeclarationUrl } from "./declaration-url";

test("declarationUrl", () => {
	const declarationUrl = makeDeclarationUrl([
		{
			kind: "variable",
			id: "foo",
			name: "foo",
			docs: [],
			file: "foo.ts",
			line: 123,
			signature: "const foo: Foo;",
		},
		{
			kind: "namespace",
			id: "bar",
			name: "bar",
			docs: [],
			file: "bar.ts",
			line: 456,
			signature: "",
			declarations: [
				{
					kind: "variable",
					id: "bar.qux",
					name: "qux",
					docs: [],
					file: "qux.ts",
					line: 789,
					signature: "const qux: Qux;",
				},
			],
		},
	]);
	expect(declarationUrl("Awaited")).toMatchInlineSnapshot(
		`"https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype"`,
	);
	expect(declarationUrl("foo")).toMatchInlineSnapshot(`"#foo"`);
	expect(declarationUrl("qux")).toMatchInlineSnapshot(`"#bar.qux"`);
});
