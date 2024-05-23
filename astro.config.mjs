import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { execSync } from "node:child_process";
import process from "node:process";
import Icons from "unplugin-icons/vite";

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
	vite: {
		plugins: [Icons({ compiler: "astro" })],
		define: {
			_GIT_COMMIT: JSON.stringify(execSync("git rev-parse HEAD").toString().trim()),
		},
	},
});
