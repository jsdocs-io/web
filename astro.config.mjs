import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import process from "node:process";

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	adapter: vercel({
		// During Vercel builds, a `bun` binary is already available at `/bun1/bun`.
		// Copying it to the build output makes it available at `/var/task/bun1/bun`
		// inside the deployed Node.js serverless functions.
		includeFiles: process.env.VERCEL ? ["/bun1/bun"] : [],
	}),
	integrations: [tailwind()],
});
