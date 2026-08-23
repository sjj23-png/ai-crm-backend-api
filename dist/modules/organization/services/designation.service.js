"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignationService = void 0;
const designation_repository_1 = require("../repositories/designation.repository");
class DesignationService {
    repository = new designation_repository_1.DesignationRepository();
    async create(data) {
        const exists = await this.repository.findByName(data.tenantId, data.name);
        if (exists) {
            throw new Error("Designation already exists.");
        }
        return this.repository.create(data);
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
    async update(id, data) {
        return this.repository.update(id, data);
    }
    async delete(id) {
        await this.repository.delete(id);
        return {
            message: "Designation deleted successfully."
        };
    }
}
exports.DesignationService = DesignationService;
//# sourceMappingURL=designation.service.js.map