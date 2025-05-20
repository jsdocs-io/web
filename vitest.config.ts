/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import { configDefaults, coverageConfigDefaults } from "vitest/config";

export default getViteConfig({
	// @ts-ignore
	test: {
		pool: "threads",
		coverage: {
			include: ["lib/**"],
			exclude: ["lib/shiki.bundle.ts", ...coverageConfigDefaults.exclude],
		},
		exclude: [...configDefaults.exclude, "old/**"],
		testTimeout: 30000,
	},
});
