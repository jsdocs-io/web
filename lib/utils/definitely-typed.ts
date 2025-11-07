/**
`getDTPackageName` returns the name of the corresponding DefinitelyTyped package
(e.g., `foo` => `@types/foo`, `@foo/bar` => `@types/foo__bar`).
*/
export function getDTPackageName(name: string): string {
	if (name.startsWith("@types/")) return name;
	return `@types/${name.replace("@", "").replace("/", "__")}`;
}

/** `isDTPackage` returns true if the package belongs to the `@types` scope. */
export function isDTPackage(name: string): boolean {
	return name.startsWith("@types/");
}
