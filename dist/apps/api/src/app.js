"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const global_error_handler_1 = require("../../../shared/errors/global-error.handler");
const node_path_1 = __importDefault(require("node:path"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// ======================
// CORE MIDDLEWARES
// ======================
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-tenant-id"],
}));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static(node_path_1.default.join(process.cwd(), "uploads")));
app.use((0, cookie_parser_1.default)());
// ======================
// BASE ROUTES
// ======================
app.use("/api", routes_1.default);
// ======================
// HEALTH CHECK
// ======================
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI CRM API is running"
    });
});
// ======================
// GLOBAL ERROR HANDLER
// ======================
app.use(global_error_handler_1.globalErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map