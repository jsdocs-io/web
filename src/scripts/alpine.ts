import type { Alpine } from "alpinejs";
import { quickSearch, quickSearchOpener } from "./quick-search";
import { timeAgo } from "./time-ago";

export default (Alpine: Alpine) => {
	Alpine.data("timeAgo", timeAgo);
	Alpine.data("quickSearchOpener", quickSearchOpener);
	Alpine.data("quickSearch", quickSearch);
};
