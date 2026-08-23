"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTenantLogo = void 0;
const multer_1 = __importDefault(require("multer"));
const upload_constants_1 = require("../constants/upload.constants");
const file_utils_1 = require("../utils/file.utils");
// Ensure upload directory exists
file_utils_1.FileUtils.ensureDirectory(upload_constants_1.TENANT_LOGO_FOLDER);
const storage = multer_1.default.diskStorage({
    destination(_req, _file, callback) {
        callback(null, upload_constants_1.TENANT_LOGO_FOLDER);
    },
    filename(_req, file, callback) {
        callback(null, file_utils_1.FileUtils.generateFilename(file.originalname));
    },
});
const fileFilter = (_req, file, callback) => {
    if (!upload_constants_1.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
        return callback(new Error("Only PNG, JPG, JPEG and WEBP images are allowed."));
    }
    callback(null, true);
};
exports.uploadTenantLogo = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: upload_constants_1.MAX_IMAGE_SIZE,
        files: 1,
    },
});
//# sourceMappingURL=upload.middleware.js.map