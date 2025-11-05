import { nanoid } from "nanoid";
import { pino } from "pino";

const logger = pino();

export function getLogger(handler: string) {
	return logger.child({ id: nanoid(), handler });
}
