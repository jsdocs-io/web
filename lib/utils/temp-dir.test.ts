import { expect, test } from "vitest";
import { tempDir } from "./temp-dir";

test("tempDir", async () => {
	await using dir = await tempDir();
	expect(dir).toBeDefined();
	expect(dir.path).toBeDefined();
});
