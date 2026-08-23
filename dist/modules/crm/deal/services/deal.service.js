"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealService = void 0;
const client_1 = require("@prisma/client");
const deal_repository_1 = require("../repositories/deal.repository");
class DealService {
    repository = new deal_repository_1.DealRepository();
    async create(dto) {
        if (!dto.tenantId || !dto.stageId) {
            throw new Error("Tenant ID and Stage ID are required.");
        }
        const existing = await this.repository.findByTitle(dto.tenantId, dto.title);
        if (existing) {
            throw new Error("Deal already exists.");
        }
        const publicId = `DEAL-${Date.now()}`;
        return this.repository.create({
            ...dto,
            tenantId: dto.tenantId,
            pipelineId: dto.pipelineId,
            stageId: dto.stageId,
            publicId,
            status: client_1.DealStatus.OPEN,
        });
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const deal = await this.repository.findById(id);
        if (!deal) {
            throw new Error("Deal not found.");
        }
        return deal;
    }
    async update(id, dto) {
        await this.getById(id);
        return this.repository.update(id, dto);
    }
    async delete(id) {
        await this.getById(id);
        await this.repository.delete(id);
        return {
            message: "Deal deleted successfully."
        };
    }
}
exports.DealService = DealService;
//# sourceMappingURL=deal.service.js.map