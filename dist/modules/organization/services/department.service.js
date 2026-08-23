"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const department_repository_1 = require("../repositories/department.repository");
class DepartmentService {
    repository = new department_repository_1.DepartmentRepository();
    async create(data) {
        const exists = await this.repository.findByName(data.name, data.tenantId);
        if (exists) {
            throw new Error("Department already exists.");
        }
        return this.repository.create(data);
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
    async delete(id) {
        await this.repository.delete(id);
        return {
            message: "Department deleted successfully."
        };
    }
}
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=department.service.js.map