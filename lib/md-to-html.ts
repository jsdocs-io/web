import { marked } from "marked";
import { domPurify } from "./dom-purify";

export const mdToHtml = async (md: string): Promise<string> => {
	const withoutZeroWidth = md.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "");
	const unsafeMd = await marked.parseInline(withoutZeroWidth);
	return domPurify.sanitize(unsafeMd);
};
