"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineService = void 0;
const client_1 = require("@prisma/client");
const pipeline_repository_1 = require("../repositories/pipeline.repository");
class PipelineService {
    repository = new pipeline_repository_1.PipelineRepository();
    async create(dto) {
        const exists = await this.repository.findByName(dto.tenantId, dto.name);
        if (exists) {
            throw new Error("Pipeline already exists.");
        }
        return this.repository.create({
            ...dto,
            publicId: `PLN-${Date.now()}`,
            status: client_1.PipelineStatus.ACTIVE,
        });
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const pipeline = await this.repository.findById(id);
        if (!pipeline) {
            throw new Error("Pipeline not found.");
        }
        return pipeline;
    }
    async update(id, dto) {
        await this.getById(id);
        return this.repository.update(id, dto);
    }
    async delete(id) {
        await this.getById(id);
        await this.repository.delete(id);
        return {
            message: "Pipeline deleted successfully.",
        };
    }
}
exports.PipelineService = PipelineService;
//# sourceMappingURL=pipeline.service.js.map