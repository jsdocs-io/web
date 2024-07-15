import type { Alpine } from "alpinejs";
import { formatDistanceStrict } from "date-fns";
import { quickSearch, quickSearchOpener } from "./quick-search";

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
