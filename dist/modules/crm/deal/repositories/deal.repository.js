"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../../database/prisma.service"));
class DealRepository {
    async create(data) {
        return prisma_service_1.default.deal.create({
            data: {
                publicId: data.publicId,
                tenantId: data.tenantId,
                stageId: data.stageId,
                pipelineId: data.pipelineId,
                title: data.title,
                value: data.value,
                currency: data.currency ?? "INR",
                status: data.status,
            },
            include: {
                company: true,
                contact: true,
                stage: true,
                pipeline: true,
                tags: true,
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.deal.findUnique({
            where: {
                id,
            },
            include: {
                company: true,
                contact: true,
                stage: true,
                pipeline: true,
                tags: true,
                notes: true,
                tasks: true,
                activities: true,
            },
        });
    }
    async findByTitle(tenantId, title) {
        return prisma_service_1.default.deal.findFirst({
            where: {
                tenantId,
                title,
            },
        });
    }
    async findAll(tenantId) {
        return prisma_service_1.default.deal.findMany({
            where: {
                tenantId,
            },
            include: {
                company: true,
                contact: true,
                pipeline: true,
                stage: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async update(id, data) {
        return prisma_service_1.default.deal.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id) {
        return prisma_service_1.default.deal.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
}
exports.DealRepository = DealRepository;
//# sourceMappingURL=deal.repository.js.map