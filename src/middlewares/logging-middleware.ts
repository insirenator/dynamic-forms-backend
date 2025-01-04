import logger from "@/utils/logger";
import morgan from "morgan";

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message: string) => logger.http(message.trim()),
    },
  }
);
