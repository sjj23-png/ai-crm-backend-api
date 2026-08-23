"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignationService = void 0;
const designation_repository_1 = require("../repositories/designation.repository");
class DesignationService {
    repository = new designation_repository_1.DesignationRepository();
    async create(tenantId, dto) {
        const existing = await this.repository.findByTenantAndName(tenantId, dto.name);
        if (existing) {
            throw new Error("Designation already exists.");
        }
        return this.repository.create(tenantId, dto);
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const designation = await this.repository.findById(id);
        if (!designation) {
            throw new Error("Designation not found.");
        }
        return designation;
    }
    async update(id, dto) {
        const designation = await this.repository.findById(id);
        if (!designation) {
            throw new Error("Designation not found.");
        }
        if (dto.name &&
            dto.name !== designation.name) {
            const exists = await this.repository.findByTenantAndName(designation.tenantId, dto.name);
            if (exists &&
                exists.id !== id) {
                throw new Error("Designation already exists.");
            }
        }
        return this.repository.update(id, dto);
    }
    async delete(id) {
        await this.getById(id);
        await this.repository.delete(id);
        return {
            message: "Designation deleted successfully.",
        };
    }
}
exports.DesignationService = DesignationService;
//# sourceMappingURL=designation.service.js.map