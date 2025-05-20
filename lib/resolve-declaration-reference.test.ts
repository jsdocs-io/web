import { fromPartial } from "@total-typescript/shoehorn";
import { expect, test } from "vitest";
import { resolveDeclarationReference } from "./resolve-declaration-reference";

test("resolveDeclarationReference", () => {
	expect(
		resolveDeclarationReference(
			fromPartial({
				packageName: "foo",
				memberReferences: [
					fromPartial({
						memberIdentifier: fromPartial({
							identifier: "bar",
						}),
					}),
					fromPartial({
						memberIdentifier: fromPartial({
							identifier: "baz",
						}),
					}),
				],
			}),
		),
	).toMatchInlineSnapshot(`
		{
		  "declarationId": "bar.baz",
		  "pkgName": "foo",
		}
	`);
});
