"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadService = void 0;
const client_1 = require("@prisma/client");
const lead_repository_1 = require("../repositories/lead.repository");
class LeadService {
    repository = new lead_repository_1.LeadRepository();
    async create(dto) {
        if (!dto.tenantId) {
            throw new Error('tenantId is required for lead creation');
        }
        const existing = await this.repository.findByEmail(dto.tenantId, dto.email);
        if (existing) {
            throw new Error("Lead already exists.");
        }
        const publicId = `LED-${Date.now()}`;
        return this.repository.create({
            ...dto,
            tenantId: dto.tenantId,
            ownerId: dto.ownerId || "",
            teamId: dto.teamId || "",
            publicId,
            status: client_1.LeadStatus.NEW,
            score: 0,
        });
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const lead = await this.repository.findById(id);
        if (!lead) {
            throw new Error("Lead not found.");
        }
        return lead;
    }
    async update(id, dto) {
        await this.getById(id);
        return this.repository.update(id, dto);
    }
    async delete(id) {
        await this.getById(id);
        await this.repository.delete(id);
        return {
            message: "Lead deleted successfully."
        };
    }
}
exports.LeadService = LeadService;
//# sourceMappingURL=lead.service.js.map