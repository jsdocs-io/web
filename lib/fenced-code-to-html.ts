import { trimNewlines } from "trim-newlines";
import { domPurify } from "./dom-purify";
import { bundledLanguages, codeToHtml } from "./shiki.bundle";

const languages = new Set(Object.keys(bundledLanguages));

export const fencedCodeToHtml = async (code: string, language: string): Promise<string> => {
	// Trim newlines to prevent rendering empty space surrounding content
	// but preserve other whitespace that may be used for alignment.
	const trimmedCode = trimNewlines(code);
	const lang = language.toLowerCase();
	const html = await codeToHtml(code, {
		// Render code to highlighted HTML if the language is supported
		// and the snippet is not too long, otherwise render as plain text.
		lang: languages.has(lang) && trimmedCode.length < 2000 ? lang : "text",
		themes: { light: "github-light", dark: "github-dark" },
		colorReplacements: {
			// Replace the white `editor.background` with light gray to show
			// the code block area against the white page background.
			"github-light": {
				"#ffffff": "#f7f7f7",
			},
		},
	});
	return domPurify.sanitize(html);
};
