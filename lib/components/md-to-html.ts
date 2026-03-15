import { marked } from "marked";
import { domPurify } from "../utils/dom-purify";

export async function mdToHtml(md: string): Promise<string> {
  /* oxlint-disable no-misleading-character-class */
  const withoutZeroWidth = md.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "");
  const unsafeMd = await marked.parseInline(withoutZeroWidth);
  return domPurify.sanitize(unsafeMd);
}
