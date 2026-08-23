"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const role_repository_1 = require("../repositories/role.repository");
class RoleService {
    repository = new role_repository_1.RoleRepository();
    async create(tenantId, dto) {
        const exists = await this.repository.findByName(dto.name, tenantId);
        if (exists) {
            throw new Error("Role already exists.");
        }
        return this.repository.create(dto);
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const role = await this.repository.findById(id);
        if (!role) {
            throw new Error("Role not found.");
        }
        return role;
    }
    async delete(id) {
        await this.repository.delete(id);
        return {
            message: "Role deleted successfully.",
        };
    }
    async update(id, dto) {
        const role = await this.repository.findById(id);
        if (!role) {
            throw new Error("Role not found.");
        }
        if (dto.name) {
            const existingRole = await this.repository.findByName(dto.name, role.tenantId);
            if (existingRole &&
                existingRole.id !== id) {
                throw new Error("Role already exists.");
            }
        }
        return this.repository.update(id, dto);
    }
}
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map