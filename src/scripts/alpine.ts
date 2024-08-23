import type { Alpine } from "alpinejs";
import { dialogOpener } from "./dialog-opener";
import { packageSearch } from "./package-search";
import { quickSearch } from "./quick-search";
import { timeAgo } from "./time-ago";

export default (Alpine: Alpine) => {
	Alpine.data("timeAgo", timeAgo);
	Alpine.data("dialogOpener", dialogOpener);
	Alpine.data("packageSearch", packageSearch);
	Alpine.data("quickSearch", quickSearch);
};
