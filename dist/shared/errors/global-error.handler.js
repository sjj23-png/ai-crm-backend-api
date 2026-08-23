"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
const logger_1 = __importDefault(require("../logger/logger"));
function globalErrorHandler(err, req, res, next) {
    logger_1.default.error({
        message: err.message,
        stack: err.stack,
        path: req.path
    });
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}
//# sourceMappingURL=global-error.handler.js.map