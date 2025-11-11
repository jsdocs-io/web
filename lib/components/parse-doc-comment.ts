import { TSDocParser, type DocComment } from "@microsoft/tsdoc";
import memoize from "memoize";

export const parseDocComment = memoize((comment: string): DocComment => {
	const parser = new TSDocParser();
	return parser.parseString(comment).docComment;
});
