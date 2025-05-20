/* Generate by @shikijs/codegen */
import { createSingletonShorthands, createdBundledHighlighter } from "@shikijs/core";
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript";
import type {
	DynamicImportLanguageRegistration,
	DynamicImportThemeRegistration,
	HighlighterGeneric,
} from "@shikijs/types";

type BundledLanguage =
	| "css"
	| "html"
	| "javascript"
	| "js"
	| "json"
	| "jsx"
	| "markdown"
	| "md"
	| "shellscript"
	| "bash"
	| "sh"
	| "shell"
	| "zsh"
	| "tsx"
	| "typescript"
	| "ts"
	| "yaml"
	| "yml";
type BundledTheme = "github-light" | "github-dark";
type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;

const bundledLanguages = {
	css: () => import("@shikijs/langs/css"),
	html: () => import("@shikijs/langs/html"),
	javascript: () => import("@shikijs/langs/javascript"),
	js: () => import("@shikijs/langs/javascript"),
	json: () => import("@shikijs/langs/json"),
	jsx: () => import("@shikijs/langs/jsx"),
	markdown: () => import("@shikijs/langs/markdown"),
	md: () => import("@shikijs/langs/markdown"),
	shellscript: () => import("@shikijs/langs/shellscript"),
	bash: () => import("@shikijs/langs/shellscript"),
	sh: () => import("@shikijs/langs/shellscript"),
	shell: () => import("@shikijs/langs/shellscript"),
	zsh: () => import("@shikijs/langs/shellscript"),
	tsx: () => import("@shikijs/langs/tsx"),
	typescript: () => import("@shikijs/langs/typescript"),
	ts: () => import("@shikijs/langs/typescript"),
	yaml: () => import("@shikijs/langs/yaml"),
	yml: () => import("@shikijs/langs/yaml"),
} as Record<BundledLanguage, DynamicImportLanguageRegistration>;

const bundledThemes = {
	"github-light": () => import("@shikijs/themes/github-light"),
	"github-dark": () => import("@shikijs/themes/github-dark"),
} as Record<BundledTheme, DynamicImportThemeRegistration>;

const createHighlighter = /* @__PURE__ */ createdBundledHighlighter<BundledLanguage, BundledTheme>({
	langs: bundledLanguages,
	themes: bundledThemes,
	engine: () => createJavaScriptRegexEngine(),
});

const {
	codeToHtml,
	codeToHast,
	codeToTokensBase,
	codeToTokens,
	codeToTokensWithThemes,
	getSingletonHighlighter,
	getLastGrammarState,
} = /* @__PURE__ */ createSingletonShorthands<BundledLanguage, BundledTheme>(createHighlighter);

export {
	bundledLanguages,
	bundledThemes,
	codeToHast,
	codeToHtml,
	codeToTokens,
	codeToTokensBase,
	codeToTokensWithThemes,
	createHighlighter,
	getLastGrammarState,
	getSingletonHighlighter,
};
export type { BundledLanguage, BundledTheme, Highlighter };
