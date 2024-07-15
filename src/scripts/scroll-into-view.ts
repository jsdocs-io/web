export const scrollIntoView = (list: HTMLUListElement | undefined, index: number) => {
	// First element at index 0 is the `template` element used by Alpine.
	// List item `li` elements start at index 1.
	list?.children[index + 1]?.scrollIntoView({ block: "nearest" });
};
