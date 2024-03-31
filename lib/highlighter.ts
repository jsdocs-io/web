import { getHighlighterCore } from "shiki/core";
import css from "shiki/langs/css.mjs";
import html from "shiki/langs/html.mjs";
import javascript from "shiki/langs/javascript.mjs";
import json from "shiki/langs/json.mjs";
import jsx from "shiki/langs/jsx.mjs";
import markdown from "shiki/langs/markdown.mjs";
import shellscript from "shiki/langs/shellscript.mjs";
import tsx from "shiki/langs/tsx.mjs";
import typescript from "shiki/langs/typescript.mjs";
import yaml from "shiki/langs/yaml.mjs";
import githubDark from "shiki/themes/github-dark.mjs";
import githubLight from "shiki/themes/github-light.mjs";
import getWasm from "shiki/wasm";

const supportedLanguages = [
	"bash",
	"css",
	"html",
	"javascript",
	"js",
	"json",
	"jsx",
	"markdown",
	"md",
	"sh",
	"shell",
	"shellscript",
	"ts",
	"tsx",
	"typescript",
	"yaml",
	"yml",
	"zsh",
];

// Replace light theme white background with light gray to show the
// code block area and not have code "floating" on the white page background.
githubLight.colors!["editor.background"] = "#f7f7f7";

const highlighter = await getHighlighterCore({
	langs: [css, html, javascript, json, jsx, markdown, shellscript, tsx, typescript, yaml],
	themes: [githubLight, githubDark],
	loadWasm: getWasm,
});

export type CodeToHtmlOptions = {
	code: string;
	language: string;
};

export const codeToHtml = ({ code, language }: CodeToHtmlOptions) => {
	const langLower = language.toLowerCase();
	const lang = supportedLanguages.includes(langLower) ? langLower : "text";
	return highlighter.codeToHtml(code, {
		lang,
		themes: { light: "github-light", dark: "github-dark" },
	});
};
