import fs from "node:fs/promises";
import { codegen } from "shiki-codegen";

const { code } = await codegen({
	langs: [
		"css",
		"html",
		"javascript",
		"json",
		"jsx",
		"markdown",
		"shellscript",
		"tsx",
		"typescript",
		"yaml",
	],
	themes: ["github-light", "github-dark"],
	engine: "javascript",
	typescript: true,
});

await fs.writeFile("lib/shiki.bundle.ts", code, "utf-8");
