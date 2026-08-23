"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantService = void 0;
const tenant_repository_1 = require("../repositories/tenant.repository");
class TenantService {
    repository = new tenant_repository_1.TenantRepository();
    async createTenant(data) {
        const existingTenant = await this.repository.findByEmail(data.email);
        if (existingTenant) {
            throw new Error("Tenant already exists.");
        }
        return this.repository.create(data);
    }
    async update(id, data) {
        const tenant = await this.repository.findById(id);
        if (!tenant) {
            throw new Error("Tenant not found.");
        }
        if (data.code &&
            data.code !== tenant.code) {
            const existing = await this.repository.findByEmail(data.email);
            if (existing) {
                throw new Error("Tenant with this email already exists.");
            }
        }
        return this.repository.update(id, data);
    }
    async getAll() {
        return this.repository.findAll();
    }
    async getById(id) {
        const tenant = await this.repository.findById(id);
        if (!tenant) {
            throw new Error("Tenant not found.");
        }
        return tenant;
    }
    async delete(id) {
        await this.repository.delete(id);
        return {
            message: "Tenant deleted successfully.",
        };
    }
}
exports.TenantService = TenantService;
//# sourceMappingURL=tenant.service.js.map