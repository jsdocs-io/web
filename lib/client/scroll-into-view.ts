export function scrollIntoView(list: HTMLUListElement | undefined, index: number) {
	list?.children[index]?.scrollIntoView({ block: "nearest" });
}
