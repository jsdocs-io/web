import type { Alpine } from "alpinejs";
import { packageSearch, packageSearchOpener } from "./package-search";
import { quickSearch, quickSearchOpener } from "./quick-search";
import { timeAgo } from "./time-ago";

export default (Alpine: Alpine) => {
	Alpine.data("timeAgo", timeAgo);
	Alpine.data("packageSearchOpener", packageSearchOpener);
	Alpine.data("packageSearch", packageSearch);
	Alpine.data("quickSearchOpener", quickSearchOpener);
	Alpine.data("quickSearch", quickSearch);
};
