/**
`definitelyTypedName` returns the name of the corresponding DefinitelyTyped package
(e.g., `foo` => `@types/foo`, `@foo/bar` => `@types/foo__bar`).
*/
export function definitelyTypedName(name: string): string {
	if (name.startsWith("@types/")) return name;
	return `@types/${name.replace("@", "").replace("/", "__")}`;
}
