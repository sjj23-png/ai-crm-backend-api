"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const department_repository_1 = require("../repositories/department.repository");
class DepartmentService {
    repository = new department_repository_1.DepartmentRepository();
    async create(tenantId, dto) {
        const existingCode = await this.repository.findByCode(tenantId, dto.code);
        if (existingCode) {
            throw new Error("Department code already exists.");
        }
        const existingName = await this.repository.findByName(tenantId, dto.name);
        if (existingName) {
            throw new Error("Department name already exists.");
        }
        return this.repository.create(tenantId, dto);
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const department = await this.repository.findById(id);
        if (!department) {
            throw new Error("Department not found.");
        }
        return department;
    }
    async update(id, dto) {
        await this.getById(id);
        return this.repository.update(id, dto);
    }
    async delete(id) {
        await this.getById(id);
        return this.repository.delete(id);
    }
}
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=department.service.js.map