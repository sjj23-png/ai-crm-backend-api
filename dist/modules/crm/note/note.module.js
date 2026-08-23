"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_routes_1 = __importDefault(require("./routes/note.routes"));
const router = (0, express_1.Router)();
router.use("/notes", note_routes_1.default);
exports.default = router;
//# sourceMappingURL=note.module.js.map