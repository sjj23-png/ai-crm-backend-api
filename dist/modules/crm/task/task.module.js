"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const router = (0, express_1.Router)();
router.use("/tasks", task_routes_1.default);
exports.default = router;
//# sourceMappingURL=task.module.js.map