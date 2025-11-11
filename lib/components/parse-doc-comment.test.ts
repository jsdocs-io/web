import { expect, test } from "vitest";
import { parseDocComment } from "./parse-doc-comment.ts";

test("parses doc comment", () => {
	expect(parseDocComment("/** @internal */").modifierTagSet.isInternal()).toBe(true);
});
