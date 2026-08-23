"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationService = void 0;
const crypto_1 = require("crypto");
const communication_repository_1 = require("../repositories/communication.repository");
class CommunicationService {
    repository = new communication_repository_1.CommunicationRepository();
    async create(tenantId, createdBy, dto) {
        const publicId = (0, crypto_1.randomUUID)();
        return this.repository.create(tenantId, publicId, createdBy, dto);
    }
    async getAll(tenantId, filters) {
        return this.repository.findAll(tenantId, filters);
    }
    async getById(id) {
        const communication = await this.repository.findById(id);
        if (!communication) {
            throw new Error("Communication not found.");
        }
        return communication;
    }
    async getByPublicId(publicId) {
        const communication = await this.repository.findByPublicId(publicId);
        if (!communication) {
            throw new Error("Communication not found.");
        }
        return communication;
    }
    async update(id, updatedBy, dto) {
        await this.getById(id);
        return this.repository.update(id, updatedBy, dto);
    }
    async markSent(id) {
        await this.getById(id);
        return this.repository.markSent(id);
    }
    async markDelivered(id) {
        await this.getById(id);
        return this.repository.markDelivered(id);
    }
    async markRead(id) {
        await this.getById(id);
        return this.repository.markRead(id);
    }
    async delete(id, updatedBy) {
        await this.getById(id);
        return this.repository.softDelete(id, updatedBy);
    }
}
exports.CommunicationService = CommunicationService;
//# sourceMappingURL=communication.service.js.map