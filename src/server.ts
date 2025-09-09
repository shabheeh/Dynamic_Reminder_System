import app from "./app";
import { Database } from "./configs/database";
import { config } from "./configs/environment";
import { container } from "./configs/inversify.config";
import logger from "./configs/logger";
import { ReminderScheduler } from "./schedulers/reminder.scheduler";
import { TYPES } from "./types/inversify.types";

class Server {
  async start(): Promise<void> {
    try {

      const scheduler = container.get<ReminderScheduler>(TYPES.ReminderScheduler);

      const server = app.listen(config.PORT, () => {
        logger.info(`Server successfully running on port: ${config.PORT}`);

        scheduler.start();
      });

      const gracefulShutdown = (signal: string) => {
        logger.info(`${signal} received, server is shutting down`);

        server.close(async () => {
          try {
            await Database.disconnect();
            logger.info("Database disconnected");
            logger.info("Shudown completed");
            process.exit(0);
          } catch (error) {
            logger.error("Error during gracefull shudown", error);
            process.exit(1);
          }
        });
      };

      process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
      process.on("SIGINT", () => gracefulShutdown("SIGINT"));

      process.on("uncaughtException", (error) => {
        logger.error("Uncaught Exception:", error);
        gracefulShutdown("UNCAUGHT_EXCEPTION");
      });

      process.on("unhandledRejection", (reason, promise) => {
        logger.error("Unhandled Rejection at:", promise, "reason:", reason);
        gracefulShutdown("UNHANDLED_REJECTION");
      });
    } catch (error) {
      logger.error("Failed to start server:", error);
      process.exit(1);
    }
  }
}

const server = new Server();
server.start().catch((error) => {
  logger.error("Server startup failed:", error);
  process.exit(1);
});
