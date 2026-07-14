import app from "./app";
import { env } from "../../../config/environment/env";
import logger from "../../../shared/logger/logger";

const PORT = env.PORT || 3001;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  // logger.info(`Environment: ${env.NODE_ENV}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    logger.info("Server closed.");
    process.exit(0);
  });
});