export const shortId = (id: string) =>
	id
		.split(".")
		.filter((part) => !part.startsWith("+"))
		.join(".");
