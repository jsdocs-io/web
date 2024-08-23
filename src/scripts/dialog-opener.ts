import { defineComponent } from "./define-component";
import { scrollIntoView } from "./scroll-into-view";

export const dialogOpener = defineComponent((dialogId: string) => ({
	dialog: undefined as HTMLDialogElement | undefined,
	results: undefined as HTMLUListElement | undefined,
	cmdKey: "",
	init() {
		this.dialog = document.querySelector<HTMLDialogElement>(dialogId) ?? undefined;
		this.results = document.querySelector<HTMLUListElement>(`${dialogId}-results`) ?? undefined;
		this.cmdKey = navigator.userAgent.includes("Mac") ? "⌘" : "Ctrl";
	},
	open() {
		if (this.dialog && !this.dialog.open) {
			this.dialog.showModal();
			scrollIntoView(this.results, 0);
		}
	},
}));
