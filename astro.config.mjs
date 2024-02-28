import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import process from "node:process";

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	adapter: vercel({
		// During the build process on Vercel, a `bun` binary is already available.
		// Including it in the build output, copies it to serverless functions
		// making it available at `/var/task/bun1/bun` for Node.js functions.
		includeFiles: process.env.VERCEL ? ["/bun1/bun"] : [],
	}),
	integrations: [tailwind()],
});
