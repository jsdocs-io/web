import type { AllExtractedDeclarationKind } from "@jsdocs-io/extractor";
import Fuse from "fuse.js/basic";
import { mod } from "../../lib/mod";
import { shortKind } from "../../lib/short-kind";
import { defineComponent } from "./define-component";
import { isMac } from "./is-mac";
import { scrollIntoView } from "./scroll-into-view";

export const quickSearchOpener = defineComponent(() => ({
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

type QuickSearchDeclaration = {
	headingId: string;
	declarationId: string;
	kind: string;
};

export const quickSearch = defineComponent(() => ({
	dialog: undefined as HTMLDialogElement | undefined,
	resultsList: undefined as HTMLUListElement | undefined,
	query: "",
	cursor: 0,
	fuse: new Fuse<QuickSearchDeclaration>([]),
	declarations: [] as QuickSearchDeclaration[],
	get results(): QuickSearchDeclaration[] {
		if (!this.query) {
			return this.declarations;
		}
		return this.fuse.search(this.query).map(({ item }) => item);
	},
	init() {
		this.dialog = findDialog();
		this.resultsList = findResultsList();
		const collator = new Intl.Collator("en");
		this.declarations = findDeclarations()
			.map((node) => ({
				headingId: node.id,
				declarationId: node.dataset.declaration!,
				kind: shortKind(node.dataset.kind as AllExtractedDeclarationKind),
			}))
			.sort((a, b) => collator.compare(a.headingId, b.headingId));
		this.fuse = new Fuse(this.declarations, { keys: ["headingId", "kind"] });
		this.$watch("query", () => {
			this.cursor = 0;
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
		const headingId = this.results[this.cursor]?.headingId;
		if (headingId) {
			window.location.hash = headingId;
			this.close();
		}
	},
}));

const findDialog = (): HTMLDialogElement | undefined => {
	return document.querySelector<HTMLDialogElement>("#quick-search") ?? undefined;
};

const findResultsList = (): HTMLUListElement | undefined => {
	return document.querySelector<HTMLUListElement>("#quick-search-results") ?? undefined;
};

const findDeclarations = (): HTMLHeadingElement[] => {
	return [...document.querySelectorAll<HTMLHeadingElement>("h3[data-declaration]")];
};
