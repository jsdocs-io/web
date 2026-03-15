/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";
import { configDefaults, coverageConfigDefaults } from "vitest/config";

export default getViteConfig({
  test: {
    pool: "threads",
    coverage: {
      include: ["lib/**"],
      exclude: ["lib/shiki/shiki.bundle.ts", ...coverageConfigDefaults.exclude],
    },
    exclude: [...configDefaults.exclude, "old/**"],
    testTimeout: 30000,
  },
});
