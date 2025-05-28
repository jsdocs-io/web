import type { Alpine } from "alpinejs";
import { dialogOpener } from "./dialog-opener";
import { quickSearch } from "./quick-search";
import { timeAgo } from "./time-ago";

export default (Alpine: Alpine) => {
	Alpine.data("timeAgo", timeAgo);
	Alpine.data("dialogOpener", dialogOpener);
	Alpine.data("quickSearch", quickSearch);
};
