"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_IMAGE_TYPES = exports.MAX_IMAGE_SIZE = exports.TENANT_LOGO_FOLDER = exports.UPLOAD_ROOT = void 0;
const node_path_1 = __importDefault(require("node:path"));
exports.UPLOAD_ROOT = node_path_1.default.join(process.cwd(), "uploads");
exports.TENANT_LOGO_FOLDER = node_path_1.default.join(exports.UPLOAD_ROOT, "tenant-logos");
exports.MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
exports.ALLOWED_IMAGE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];
//# sourceMappingURL=upload.constants.js.map