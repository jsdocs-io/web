import type { AllExtractedDeclaration } from "@jsdocs-io/extractor";
import { codeToHtml, highlighter } from "./highlighter";

export const declarationSignature = (declaration: AllExtractedDeclaration) => {
	const { kind } = declaration;
	switch (kind) {
		case "variable":
		case "class":
		case "interface":
		case "enum":
		case "type":
		case "namespace": {
			// Just highlight the signature as-is.
			return codeToHtml({ code: declaration.signature, language: "typescript" });
		}
		case "function": {
			if (declaration.signature.startsWith("{")) {
				// Just highlight overloaded functions as-is.
				return codeToHtml({ code: declaration.signature, language: "typescript" });
			}
			// Temporarily wrap functions in an interface for correct highlighting.
			const signature = ["interface I {", declaration.signature, "}"].join("\n");
			return wrappedCodeToHtml(signature);
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
			// Temporarily wrap members in their parent declaration for correct highlighting.
			const parentKind = kind.split("-")[0]!;
			const signature = [`${parentKind} P {`, declaration.signature, "}"].join("\n");
			return wrappedCodeToHtml(signature);
		}
	}
};

const wrappedCodeToHtml = (signature: string) =>
	highlighter.codeToHtml(signature, {
		lang: "typescript",
		themes: { light: "github-light", dark: "github-dark" },
		transformers: [
			{
				code(node) {
					// Remove wrapper lines.
					// One children is the line of wrapper code (e.g., `interface I {`, `}`)
					// and one is the next or previous newline character (`\n`).
					node.children = node.children.slice(2, -2);
				},
			},
		],
	});
