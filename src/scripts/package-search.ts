import { searchPackages } from "query-registry";
import { mod } from "../../lib/mod";
import { defineComponent } from "./define-component";
import { isMac } from "./is-mac";
import { scrollIntoView } from "./scroll-into-view";

export const packageSearchOpener = defineComponent(() => ({
	dialog: undefined as HTMLDialogElement | undefined,
	resultsList: undefined as HTMLUListElement | undefined,
	init() {
		this.dialog = findDialog();
		this.resultsList = findResultsList();
	},
	open() {
		if (this.dialog && !this.dialog.open) {
			this.dialog.showModal();
			scrollIntoView(this.resultsList, 0);
		}
	},
	cmdSymbol(): string {
		return isMac() ? "⌘" : "Ctrl";
	},
}));

type NpmPackage = {
	name: string;
	description: string;
};

export const packageSearch = defineComponent(() => ({
	dialog: undefined as HTMLDialogElement | undefined,
	resultsList: undefined as HTMLUListElement | undefined,
	query: "",
	cursor: 0,
	results: [] as NpmPackage[],
	init() {
		this.dialog = findDialog();
		this.resultsList = findResultsList();
		this.$watch("query", () => {
			this.cursor = 0;
		});
		this.$watch("query", async () => {
			const { objects } = await searchPackages({ text: this.query });
			this.results = objects.map(({ package: { name, description } }) => ({
				name,
				description: description ?? "Description not available.",
			}));
		});
		this.$watch("cursor", () => {
			scrollIntoView(this.resultsList, this.cursor);
		});
	},
	close() {
		this.query = "";
		this.cursor = 0;
		this.dialog?.close();
	},
	prevResult() {
		this.cursor = mod(this.cursor - 1, this.results.length);
	},
	nextResult() {
		this.cursor = mod(this.cursor + 1, this.results.length);
	},
	useResult() {
		const pkgName = this.results[this.cursor]?.name;
		if (pkgName) {
			this.close();
			window.location.href = `/package/${pkgName}`;
		}
	},
}));

const findDialog = (): HTMLDialogElement | undefined => {
	return document.querySelector<HTMLDialogElement>("#package-search") ?? undefined;
};

const findResultsList = (): HTMLUListElement | undefined => {
	return document.querySelector<HTMLUListElement>("#package-search-results") ?? undefined;
};
