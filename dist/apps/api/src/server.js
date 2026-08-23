"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("../../../config/environment/env");
const logger_1 = __importDefault(require("../../../shared/logger/logger"));
const PORT = env_1.env.PORT || 4001;
const server = app_1.default.listen(PORT, () => {
    logger_1.default.info(`🚀 Server running on port ${PORT}`);
    // logger.info(`Environment: ${env.NODE_ENV}`);
});
// Graceful shutdown
process.on("SIGTERM", () => {
    logger_1.default.info("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
        logger_1.default.info("Server closed.");
        process.exit(0);
    });
});
//# sourceMappingURL=server.js.map