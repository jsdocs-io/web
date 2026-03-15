import { nanoid } from "nanoid";
import { pino } from "pino";
import { serverEnv } from "../env/server-env";

const logger = pino({
  level: serverEnv.PINO_LOG_LEVEL,
});

export function getLogger(handler: string) {
  return logger.child({ id: nanoid(), handler });
}
