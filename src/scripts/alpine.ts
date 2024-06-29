import type { Alpine } from "alpinejs";
import { formatDistanceStrict } from "date-fns";

export default (Alpine: Alpine) => {
	timeAgo(Alpine);
};

const timeAgo = (Alpine: Alpine) => {
	Alpine.data("timeAgo", (timestamp: string) => ({
		text: formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true }),
	}));
};
