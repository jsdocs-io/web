import type { Alpine } from "alpinejs";
import { quickSearch, quickSearchOpener } from "./quick-search";
import { timeAgo } from "./time-ago";

export default (Alpine: Alpine) => {
	timeAgo(Alpine);
	quickSearchOpener(Alpine);
	quickSearch(Alpine);
};
