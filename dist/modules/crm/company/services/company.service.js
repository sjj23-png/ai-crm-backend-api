"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const company_repository_1 = require("../repositories/company.repository");
class CompanyService {
    repository = new company_repository_1.CompanyRepository();
    async create(data) {
        if (!data.tenantId) {
            throw new Error("Tenant ID is required.");
        }
        const exists = await this.repository.findByName(data.tenantId, data.name);
        if (exists) {
            throw new Error("Company already exists.");
        }
        return this.repository.create({
            ...data,
            tenantId: data.tenantId,
            publicId: await this.generatePublicId(),
            status: "ACTIVE"
        });
    }
    async generatePublicId() {
        const value = Date.now();
        return `CMP-${value}`;
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async update(id, data) {
        await this.getById(id);
        return this.repository.update(id, data);
    }
    async delete(id) {
        await this.getById(id);
        await this.repository.delete(id);
        return {
            message: "Company deleted successfully.",
        };
    }
    async getById(id) {
        const company = await this.repository.findById(id);
        if (!company) {
            throw new Error("Company not found.");
        }
        return company;
    }
}
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map