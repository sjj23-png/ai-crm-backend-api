"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../../database/prisma.service"));
class PipelineRepository {
    async create(data) {
        return prisma_service_1.default.pipeline.create({
            data,
            include: {
                stages: true,
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.pipeline.findUnique({
            where: {
                id,
            },
            include: {
                stages: {
                    orderBy: {
                        displayOrder: "asc",
                    },
                },
            },
        });
    }
    async findByName(tenantId, name) {
        return prisma_service_1.default.pipeline.findFirst({
            where: {
                tenantId,
                name,
            },
        });
    }
    async findAll(tenantId) {
        return prisma_service_1.default.pipeline.findMany({
            where: {
                tenantId,
                deletedAt: null,
            },
            include: {
                stages: {
                    orderBy: {
                        displayOrder: "asc",
                    },
                },
            },
            orderBy: [
                {
                    displayOrder: "asc",
                },
                {
                    createdAt: "asc",
                },
            ],
        });
    }
    async update(id, data) {
        return prisma_service_1.default.pipeline.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id) {
        return prisma_service_1.default.pipeline.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
}
exports.PipelineRepository = PipelineRepository;
//# sourceMappingURL=pipeline.repository.js.map