import { beforeEach, expect, test, vi } from "vitest";

beforeEach(() => {
	vi.resetModules();
	vi.unstubAllEnvs();
});

test("default serverEnv", async () => {
	const { serverEnv } = await import("./server-env");
	expect(serverEnv).toBeDefined();
	expect(serverEnv.BUN_PATH).toMatchInlineSnapshot(`"bun"`);
});

test("serverEnv on Vercel", async () => {
	vi.stubEnv("VERCEL", "1");
	const { serverEnv } = await import("./server-env");
	expect(serverEnv).toBeDefined();
	expect(serverEnv.BUN_PATH).toMatchInlineSnapshot(`"/var/task/bun1/bun"`);
});
