import { formatDistanceStrict } from "date-fns";
import { defineComponent } from "./define-component";

export const timeAgo = defineComponent((timestamp: string) => ({
	text: formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true }),
}));
