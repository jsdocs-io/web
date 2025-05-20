import type { AllExtractedDeclaration } from "@jsdocs-io/extractor";
import type { DeclarationUrlFn } from "./declaration-url";
import { domPurify } from "./dom-purify";
import { codeToHtml } from "./shiki.bundle";

const reservedKeywords = new Set([
	"any",
	"as",
	"async",
	"await",
	"bigint",
	"boolean",
	"break",
	"case",
	"catch",
	"class",
	"const",
	"constructor",
	"continue",
	"debugger",
	"declare",
	"default",
	"delete",
	"do",
	"else",
	"enum",
	"export",
	"extends",
	"false",
	"finally",
	"for",
	"from",
	"function",
	"get",
	"if",
	"implements",
	"import",
	"in",
	"instanceof",
	"interface",
	"let",
	"module",
	"namespace",
	"never",
	"new",
	"null",
	"number",
	"object",
	"of",
	"package",
	"private",
	"protected",
	"public",
	"readonly",
	"require",
	"return",
	"set",
	"static",
	"string",
	"super",
	"switch",
	"symbol",
	"this",
	"throw",
	"true",
	"try",
	"type",
	"typeof",
	"undefined",
	"unknown",
	"var",
	"void",
	"while",
	"with",
	"yield",
]);

export const declarationSignatureToHtml = async (
	declaration: AllExtractedDeclaration,
	declarationUrl: DeclarationUrlFn,
): Promise<string> => {
	const { signature, isWrapped } = prepareSignature(declaration);
	const html = await codeToHtml(signature, {
		// Render to highlighted HTML if the signature is not too long,
		// otherwise render as plain text.
		lang: declaration.signature.length < 4000 ? "typescript" : "text",
		themes: { light: "github-light", dark: "github-dark" },
		colorReplacements: {
			// Replace the white `editor.background` with light gray to show
			// the code block area against the white page background.
			"github-light": {
				"#fff": "#f7f7f7",
			},
		},
		// Prevent whitespace from being collapsed for correct theme coloring.
		mergeWhitespaces: false,
		transformers: [
			{
				span(node) {
					// Don't link from parameter names (e.g., don't link from `foo` in `foo: SomeType`).
					const style = String(node.properties["style"]).toLowerCase();
					if (style === "color:#e36209;--shiki-dark:#ffab70") return;

					const firstChild = node.children[0];
					if (firstChild?.type !== "text") return;

					const text = firstChild.value;
					if (text === declaration.name || reservedKeywords.has(text)) return;

					const url = declarationUrl(text);
					if (!url) return;

					// Link to other declarations found in the signature of this declaration.
					node.tagName = "a";
					node.properties["href"] = url;
				},
				code(node) {
					if (isWrapped) {
						// Remove wrapper lines.
						// One child is the `span` with the line of wrapper code (e.g., `interface I {` or `}`)
						// and the other child is the adjacent newline character (`\n`).
						node.children = node.children.slice(2, -2);
					}
				},
			},
		],
	});
	return domPurify.sanitize(html);
};

const prepareSignature = (declaration: AllExtractedDeclaration) => {
	const { kind, signature } = declaration;
	switch (kind) {
		case "variable":
		case "class":
		case "interface":
		case "enum":
		case "type":
		case "namespace": {
			// Return signature as-is.
			return { signature, isWrapped: false };
		}
		case "function": {
			return {
				// Temporarily wrap functions in an interface for correct highlighting.
				signature: ["interface I {", signature, "}"].join("\n"),
				isWrapped: true,
			};
		}
		case "class-constructor":
		case "class-property":
		case "class-method":
		case "interface-property":
		case "interface-method":
		case "interface-construct-signature":
		case "interface-call-signature":
		case "interface-index-signature":
		case "interface-get-accessor":
		case "interface-set-accessor":
		case "enum-member": {
			const parentKind = kind.split("-")[0]!;
			return {
				// Temporarily wrap members in their parent declaration for correct highlighting.
				signature: [`${parentKind} P {`, declaration.signature, "}"].join("\n"),
				isWrapped: true,
			};
		}
	}
};
