import type { Alpine } from "alpinejs";
import { formatDistanceStrict } from "date-fns";
import Fuse from "fuse.js/basic";
import { mod } from "../../lib/mod";

export default (Alpine: Alpine) => {
	timeAgo(Alpine);
	quickSearchOpener(Alpine);
	quickSearch(Alpine);
};

const timeAgo = (Alpine: Alpine) => {
	Alpine.data("timeAgo", (timestamp: string) => ({
		text: formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true }),
	}));
};

type QuickSearchOpener = {
	dialog: HTMLDialogElement | undefined;
	init(): void;
	open(): void;
};

const quickSearchOpener = (Alpine: Alpine) => {
	Alpine.data(
		"quickSearchOpener",
		() =>
			({
				dialog: undefined,
				init() {
					this.dialog = (document.querySelector("#quick-search") ?? undefined) as any;
				},
				open() {
					if (this.dialog && !this.dialog.open) {
						this.dialog.showModal();
					}
				},
			}) as QuickSearchOpener,
	);
};

type QuickSearch = {
	$watch(target: string, callback: () => void): void;
	dialog: HTMLDialogElement | undefined;
	list: HTMLUListElement | undefined;
	query: string;
	cursor: number;
	fuse: Fuse<QuickSearchDeclaration>;
	declarations: QuickSearchDeclaration[];
	results: QuickSearchDeclaration[];
	init(): void;
	close(): void;
	prevResult(): void;
	nextResult(): void;
	useResult(): void;
	focusResult(): void;
};

type QuickSearchDeclaration = {
	headingId: string;
	declarationId: string;
	kind: string;
	name: string;
};

const quickSearch = (Alpine: Alpine) => {
	Alpine.data(
		"quickSearch",
		() =>
			({
				dialog: undefined,
				list: undefined,
				query: "",
				cursor: 0,
				fuse: new Fuse([] as QuickSearchDeclaration[]),
				declarations: [] as QuickSearchDeclaration[],
				get results() {
					if (!this.query) {
						return this.declarations;
					}
					return this.fuse.search(this.query).map((result) => result.item);
				},
				init() {
					this.dialog = (document.querySelector("#quick-search") ?? undefined) as any;
					this.list = (document.querySelector("#quick-search-results") ?? undefined) as any;
					const collator = new Intl.Collator("en");
					this.declarations = [
						...(document.querySelectorAll(
							"h3[data-declaration]",
						) as NodeListOf<HTMLHeadingElement>),
					]
						.map((node) => ({
							headingId: node.id,
							declarationId: node.dataset.declaration ?? "",
							kind: node.dataset.kind ?? "",
							name: node.dataset.name ?? "",
						}))
						.sort((a, b) => collator.compare(a.headingId, b.headingId));
					this.fuse = new Fuse(this.declarations, { keys: ["headingId", "kind"] });
					this.$watch("query", () => {
						this.cursor = 0;
					});
					this.$watch("cursor", () => {
						this.focusResult();
					});
				},
				close() {
					this.dialog?.close();
					this.query = "";
				},
				prevResult() {
					this.cursor = mod(this.cursor - 1, this.results.length);
				},
				nextResult() {
					this.cursor = mod(this.cursor + 1, this.results.length);
				},
				useResult() {
					console.log("useResult");
				},
				focusResult() {
					this.list?.children[this.cursor + 1]?.scrollIntoView({ block: "nearest" });
				},
			}) as QuickSearch,
	);
};
