import type { ExtractedDeclaration } from "@jsdocs-io/extractor";
import { shortId } from "./short-id";

export type DeclarationUrlFn = ReturnType<typeof makeDeclarationUrl>;

const tsUtilityUrl = "https://www.typescriptlang.org/docs/handbook/utility-types.html";
const tsStringUrl = "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html";
const knownTypes = [
	// TypeScript utility types.
	["Awaited", `${tsUtilityUrl}#awaitedtype`],
	["Partial", `${tsUtilityUrl}#partialtype`],
	["Required", `${tsUtilityUrl}#requiredtype`],
	["Readonly", `${tsUtilityUrl}#readonlytype`],
	["Record", `${tsUtilityUrl}#recordkeys-type`],
	["Pick", `${tsUtilityUrl}#picktype-keys`],
	["Omit", `${tsUtilityUrl}#omittype-keys`],
	["Exclude", `${tsUtilityUrl}#excludeuniontype-excludedmembers`],
	["Extract", `${tsUtilityUrl}#extracttype-union`],
	["NonNullable", `${tsUtilityUrl}#nonnullabletype`],
	["Parameters", `${tsUtilityUrl}#parameterstype`],
	["ConstructorParameters", `${tsUtilityUrl}#constructorparameterstype`],
	["ReturnType", `${tsUtilityUrl}#returntypetype`],
	["InstanceType", `${tsUtilityUrl}#instancetypetype`],
	["NoInfer", `${tsUtilityUrl}#noinfertype`],
	["ThisParameterType", `${tsUtilityUrl}#thisparametertypetype`],
	["OmitThisParameter", `${tsUtilityUrl}#omitthisparametertype`],
	["ThisType", `${tsUtilityUrl}#thistypetype`],

	// TypeScript string types.
	["Uppercase", `${tsStringUrl}#uppercasestringtype`],
	["Lowercase", `${tsStringUrl}#lowercasestringtype`],
	["Capitalize", `${tsStringUrl}#capitalizestringtype`],
	["Uncapitalize", `${tsStringUrl}#uncapitalizestringtype`],

	// TypeScript `keyof` and `typeof`.
	["keyof", "https://www.typescriptlang.org/docs/handbook/2/keyof-types.html"],
	["typeof", "https://www.typescriptlang.org/docs/handbook/2/typeof-types.html"],
] as const;

export const makeDeclarationUrl = (declarations: ExtractedDeclaration[]) => {
	const nameToUrl = new Map<string, string>(knownTypes);
	addDeclarations(declarations, nameToUrl);
	return (name: string): string | undefined => nameToUrl.get(name);
};

const addDeclarations = (declarations: ExtractedDeclaration[], nameToUrl: Map<string, string>) => {
	for (const declaration of declarations) {
		if (declaration.kind === "namespace") {
			addDeclarations(declaration.declarations, nameToUrl);
		}
		nameToUrl.set(declaration.name, `#${shortId(declaration.id)}`);
	}
};
