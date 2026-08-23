"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const contact_repository_1 = require("../repositories/contact.repository");
const company_repository_1 = require("../../company/repositories/company.repository");
class ContactService {
    repository = new contact_repository_1.ContactRepository();
    companyRepository = new company_repository_1.CompanyRepository();
    async create(data) {
        if (!data.tenantId) {
            throw new Error("Tenant ID is required.");
        }
        const exists = await this.repository.findByEmail(data.tenantId, data.email);
        if (exists) {
            throw new Error("Contact email already exists.");
        }
        const company = await this.companyRepository.findById(data.companyId);
        if (!company) {
            throw new Error("Company not found.");
        }
        return this.repository.create({
            ...data,
            tenantId: data.tenantId,
            ownerId: data.ownerId || company.ownerId || "",
            teamId: data.teamId || company.teamId || "",
            publicId: await this.generatePublicId(),
            status: "ACTIVE",
        });
    }
    async generatePublicId() {
        return `CNT-${Date.now()}`;
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const contact = await this.repository.findById(id);
        if (!contact) {
            throw new Error("Contact not found.");
        }
        return contact;
    }
    async getCompanyContacts(companyId) {
        return this.repository.findByCompany(companyId);
    }
    async update(id, data) {
        await this.getById(id);
        if (data.email) {
            const existing = await this.repository.findByEmail(data.tenantId, data.email);
            if (existing &&
                existing.id !== id) {
                throw new Error("Contact email already exists.");
            }
        }
        return this.repository.update(id, data);
    }
    async delete(id) {
        await this.getById(id);
        await this.repository.delete(id);
        return {
            message: "Contact deleted successfully.",
        };
    }
}
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map