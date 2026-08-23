"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtils = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_crypto_1 = require("node:crypto");
class FileUtils {
    static ensureDirectory(directory) {
        if (!node_fs_1.default.existsSync(directory)) {
            node_fs_1.default.mkdirSync(directory, {
                recursive: true,
            });
        }
    }
    static generateFilename(originalName) {
        const extension = node_path_1.default
            .extname(originalName)
            .toLowerCase();
        return `${(0, node_crypto_1.randomUUID)()}${extension}`;
    }
    static deleteFile(filePath) {
        if (node_fs_1.default.existsSync(filePath)) {
            node_fs_1.default.unlinkSync(filePath);
        }
    }
    static getPublicUrl(folder, filename) {
        return `/uploads/${folder}/${filename}`;
    }
}
exports.FileUtils = FileUtils;
//# sourceMappingURL=file.utils.js.map