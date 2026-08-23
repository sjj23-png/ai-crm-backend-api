"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const storage_service_1 = require("../services/storage.service");
const storageService = new storage_service_1.StorageService();
class StorageController {
    uploadTenantLogo(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Logo file is required.",
                });
            }
            const result = storageService.saveTenantLogo(req.file);
            return res.status(201).json({
                success: true,
                message: "Logo uploaded successfully.",
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    deleteTenantLogo(req, res, next) {
        try {
            storageService.deleteTenantLogo(req.params.filename);
            return res.status(200).json({
                success: true,
                message: "Logo deleted successfully.",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StorageController = StorageController;
//# sourceMappingURL=storage.controller.js.map