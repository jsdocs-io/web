/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
	test: {
		pool: "forks",
		coverage: {
			include: ["src/**"],
		},
	},
});
