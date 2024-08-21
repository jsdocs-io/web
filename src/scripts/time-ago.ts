import { defineComponent } from "./define-component";

export const timeAgo = defineComponent((timestamp: string) => ({
	text: formatTimeAgo(timestamp),
}));

const formatTimeAgo = (timestamp: string) => {
	const units = [
		["year", 365 * 24 * 60 * 60 * 1000],
		["month", 30 * 24 * 60 * 60 * 1000],
		["day", 24 * 60 * 60 * 1000],
		["hour", 60 * 60 * 1000],
		["minute", 60 * 1000],
		["second", 1000],
	] as const;
	const diff = Date.now() - new Date(timestamp).getTime();
	const elapsed = Math.abs(diff);
	for (const [name, size] of units) {
		const value = Math.floor(elapsed / size);
		if (value > 0) {
			const plural = value > 1 ? "s" : "";
			const description = `${value} ${name}${plural}`;
			return diff > 0 ? `${description} ago` : `in ${description}`;
		}
	}
	return "just now";
};
