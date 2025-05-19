import alpinejs from "@astrojs/alpinejs";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { execSync } from "node:child_process";
import process from "node:process";
import { visualizer } from "rollup-plugin-visualizer";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
	output: "static",
	adapter:
		process.env.VERCEL ?
			vercel({
				// During Vercel builds, a `bun` binary is already available at `/bun1/bun`.
				// Copying it to the build output makes it available at `/var/task/bun1/bun`
				// inside the deployed Node.js serverless functions.
				includeFiles: ["/bun1/bun"],
			})
		:	node({ mode: "standalone" }),
	integrations: [alpinejs({ entrypoint: "/src/scripts/alpine" }), tailwind()],
	vite: {
		plugins: [Icons({ compiler: "astro" }), visualizer()],
		define: {
			_GIT_COMMIT: JSON.stringify(execSync("git rev-parse HEAD").toString().trim()),
		},
	},
});
