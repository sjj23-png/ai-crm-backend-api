"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
const permission_repository_1 = require("../repositories/permission.repository");
class PermissionService {
    repository = new permission_repository_1.PermissionRepository();
    async create(data) {
        const exists = await this.repository.findByCode(data.tenantId, data.code);
        if (exists) {
            throw new Error("Permission code already exists.");
        }
        return this.repository.create(data);
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const permission = await this.repository.findById(id);
        if (!permission) {
            throw new Error("Permission not found.");
        }
        return permission;
    }
    async update(id, data) {
        const permission = await this.repository.findById(id);
        if (!permission) {
            throw new Error("Permission not found.");
        }
        return this.repository.update(id, data);
    }
    async delete(id) {
        await this.repository.delete(id);
        return {
            message: "Permission deleted successfully.",
        };
    }
}
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map