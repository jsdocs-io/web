import type { AllExtractedDeclaration } from "@jsdocs-io/extractor";
import type { DeclarationUrlFn } from "./declaration-url";
import { highlighter } from "./highlighter";

export const declarationSignatureHtml = (
	declaration: AllExtractedDeclaration,
	declarationUrl: DeclarationUrlFn,
) => {
	const { signature, isWrapped } = prepareSignature(declaration);
	return highlighter.codeToHtml(signature, {
		mergeWhitespaces: false,
		lang: "typescript",
		themes: { light: "github-light", dark: "github-dark" },
		transformers: [
			{
				span(node) {
					const firstChild = node.children[0];
					if (firstChild?.type !== "text") {
						return;
					}
					const text = firstChild.value;
					const url = declarationUrl(text);
					if (text === declaration.name || !url) {
						return;
					}
					if (node.properties["style"] === "color:#E36209;--shiki-dark:#FFAB70") {
						// Don't link from parameter names (e.g., don't link from `foo` in `foo: SomeType`).
						return;
					}
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