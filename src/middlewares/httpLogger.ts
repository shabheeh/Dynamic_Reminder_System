import { config } from "@/configs/environment";
import logger from "@/configs/logger";
import morgan, { StreamOptions } from "morgan";

const format = config.NODE_ENV === "production" ? "combined" : "dev";

const stream: StreamOptions = {
  write: (message) => logger.info(message.trim()),
};

const httpLogger = morgan(format, {
  stream,
});

export default httpLogger;