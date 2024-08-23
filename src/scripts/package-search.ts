import { mod } from "../../lib/mod";
import { defineComponent } from "./define-component";
import { scrollIntoView } from "./scroll-into-view";

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
		this.$watch("query", async () => {
			this.results = await searchPackages(this.query);
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

const searchPackages = async (text: string): Promise<NpmPackage[]> => {
	const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${text}`);
	const json = (await res.json()) as {
		objects: { package: { name: string; description?: string } }[];
	};
	return json.objects.map((result) => ({
		name: result.package.name,
		description: result.package.description ?? "Description not available.",
	}));
};
