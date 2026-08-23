"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../../database/prisma.service"));
class LeadRepository {
    async create(data) {
        return prisma_service_1.default.lead.create({
            data: {
                publicId: data.publicId,
                tenantId: data.tenantId,
                ownerId: data.ownerId,
                teamId: data.teamId,
                companyId: data.companyId,
                contactId: data.contactId,
                pipelineId: data.pipelineId,
                stageId: data.stageId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                source: data.source,
                status: data.status,
                score: data.score,
                estimatedValue: data.estimatedValue,
                expectedCloseDate: data.expectedCloseDate,
            },
            include: {
                company: true,
                contact: true,
                owner: true,
                team: true,
                pipeline: true,
                stage: true,
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.lead.findUnique({
            where: {
                id,
            },
            include: {
                company: true,
                contact: true,
                owner: true,
                team: true,
                pipeline: true,
                stage: true,
                activities: true,
                notes: true,
                communications: true,
            },
        });
    }
    async findByEmail(tenantId, email) {
        return prisma_service_1.default.lead.findFirst({
            where: {
                tenantId,
                email,
            },
        });
    }
    async findAll(tenantId) {
        return prisma_service_1.default.lead.findMany({
            where: {
                tenantId,
                deletedAt: null,
            },
            include: {
                company: true,
                contact: true,
                owner: true,
                team: true,
                pipeline: true,
                stage: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async update(id, data) {
        return prisma_service_1.default.lead.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id) {
        return prisma_service_1.default.lead.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
}
exports.LeadRepository = LeadRepository;
//# sourceMappingURL=lead.repository.js.map