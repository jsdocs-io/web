import type { Alpine } from "alpinejs";
import { formatDistanceStrict } from "date-fns";

type QuickSearchStore = {
	dialog: HTMLDialogElement | undefined;
	isOpen: boolean;
	query: string;
	init(): void;
	open(): void;
	close(): void;
};

export default (Alpine: Alpine) => {
	timeAgo(Alpine);
	quickSearchStore(Alpine);
};

const timeAgo = (Alpine: Alpine) => {
	Alpine.data("timeAgo", (timestamp: string) => ({
		text: formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true }),
	}));
};

const quickSearchStore = (Alpine: Alpine) => {
	Alpine.store("quickSearch", {
		dialog: undefined,
		isOpen: false,
		query: "",
		init() {
			this.dialog = (document.querySelector("#quick-search") ?? undefined) as any;
			console.log("init");
		},
		open() {
			if (this.dialog && !this.dialog.open) {
				this.isOpen = true;
				this.dialog.showModal();
				console.log("open");
			}
		},
		close() {
			if (this.dialog) {
				this.dialog.close();
				this.query = "";
				this.isOpen = false;
				console.log("close");
			}
		},
	} as QuickSearchStore);
};
