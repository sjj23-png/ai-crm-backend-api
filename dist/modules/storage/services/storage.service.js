"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const node_path_1 = __importDefault(require("node:path"));
const file_utils_1 = require("../utils/file.utils");
class StorageService {
    /**
     * Returns the public URL for a newly uploaded file.
     */
    saveTenantLogo(file) {
        return {
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path,
            publicUrl: file_utils_1.FileUtils.getPublicUrl("tenant-logos", file.filename),
        };
    }
    /**
     * Delete an uploaded file.
     */
    deleteTenantLogo(filename) {
        const filePath = node_path_1.default.join(process.cwd(), "uploads", "tenant-logos", filename);
        file_utils_1.FileUtils.deleteFile(filePath);
        return true;
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map