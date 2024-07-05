import type { Alpine } from "alpinejs";
import { formatDistanceStrict } from "date-fns";
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
	$refs: {
		quickSearchResults: HTMLUListElement;
	};
	$watch(target: string, callback: () => void): void;
	dialog: HTMLDialogElement | undefined;
	query: string;
	declarations: number[];
	cursor: number;
	results: number[];
	init(): void;
	close(): void;
	prevResult(): void;
	nextResult(): void;
	useResult(): void;
	focusResult(): void;
};

const quickSearch = (Alpine: Alpine) => {
	Alpine.data(
		"quickSearch",
		() =>
			({
				dialog: undefined,
				query: "",
				declarations: Array.from({ length: 100 }, (_, i) => i + 1),
				cursor: 0,
				get results() {
					if (!this.query) {
						return this.declarations;
					}
					return this.declarations.filter((declaration) => declaration > Number(this.query));
				},
				init() {
					this.dialog = (document.querySelector("#quick-search") ?? undefined) as any;
					this.$watch("query", () => {
						this.cursor = 0;
					});
					this.$watch("cursor", () => {
						this.focusResult();
					});
				},
				close() {
					if (this.dialog) {
						this.dialog.close();
						this.query = "";
					}
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
					this.$refs.quickSearchResults.children[this.cursor + 1]?.scrollIntoView({
						block: "nearest",
					});
				},
			}) as QuickSearch,
	);
};
