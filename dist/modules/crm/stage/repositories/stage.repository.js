"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../../database/prisma.service"));
class StageRepository {
    async create(data) {
        return prisma_service_1.default.stage.create({
            data,
            include: {
                pipeline: true,
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.stage.findUnique({
            where: {
                id,
            },
            include: {
                pipeline: true,
                deals: true,
                leads: true,
            },
        });
    }
    async findByName(pipelineId, name) {
        return prisma_service_1.default.stage.findFirst({
            where: {
                pipelineId,
                name,
            },
        });
    }
    async findPipelineStages(pipelineId) {
        return prisma_service_1.default.stage.findMany({
            where: {
                pipelineId,
                deletedAt: null,
            },
            orderBy: {
                displayOrder: "asc",
            },
        });
    }
    async update(id, data) {
        return prisma_service_1.default.stage.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id) {
        return prisma_service_1.default.stage.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
}
exports.StageRepository = StageRepository;
//# sourceMappingURL=stage.repository.js.map