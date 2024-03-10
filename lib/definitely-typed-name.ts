/**
`definitelyTypedName` returns the name of the corresponding DefinitelyTyped package
(e.g., `foo` => `@types/foo`, `@foo/bar` => `@types/foo__bar`).
*/
export const definitelyTypedName = (name: string) =>
	name.startsWith("@types/") ? name : `@types/${name.replace("@", "").replace("/", "__")}`;
