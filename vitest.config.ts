/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import { configDefaults } from "vitest/config";

export default getViteConfig({
	// @ts-ignore
	test: {
		pool: "forks",
		coverage: {
			include: ["lib/**"],
		},
		exclude: [...configDefaults.exclude, "old/**"],
		testTimeout: 30000,
	},
});
