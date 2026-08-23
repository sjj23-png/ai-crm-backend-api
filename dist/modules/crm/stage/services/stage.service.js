"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageService = void 0;
const client_1 = require("@prisma/client");
const stage_repository_1 = require("../repositories/stage.repository");
class StageService {
    repository = new stage_repository_1.StageRepository();
    async create(dto) {
        const exists = await this.repository.findByName(dto.pipelineId, dto.name);
        if (exists) {
            throw new Error("Stage already exists.");
        }
        if (dto.isWonStage &&
            dto.isLostStage) {
            throw new Error("Stage cannot be both Won and Lost.");
        }
        return this.repository.create({
            ...dto,
            publicId: `STG-${Date.now()}`,
            status: client_1.StageStatus.ACTIVE,
        });
    }
    async getPipelineStages(pipelineId) {
        return this.repository.findPipelineStages(pipelineId);
    }
    async getById(id) {
        const stage = await this.repository.findById(id);
        if (!stage) {
            throw new Error("Stage not found.");
        }
        return stage;
    }
    async update(id, dto) {
        await this.getById(id);
        if (dto.isWonStage &&
            dto.isLostStage) {
            throw new Error("Stage cannot be both Won and Lost.");
        }
        return this.repository.update(id, dto);
    }
    async delete(id) {
        await this.getById(id);
        await this.repository.delete(id);
        return {
            message: "Stage deleted successfully."
        };
    }
}
exports.StageService = StageService;
//# sourceMappingURL=stage.service.js.map