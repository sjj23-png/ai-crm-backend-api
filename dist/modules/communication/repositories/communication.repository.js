"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class CommunicationRepository {
    async create(tenantId, publicId, createdBy, data) {
        return prisma_service_1.default.communication.create({
            data: {
                tenantId,
                publicId,
                createdBy,
                ...data,
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.communication.findUnique({
            where: {
                id,
            },
            include: {
                sender: true,
                company: true,
                contact: true,
                lead: true,
                deal: true,
            },
        });
    }
    async findByPublicId(publicId) {
        return prisma_service_1.default.communication.findUnique({
            where: {
                publicId,
            },
            include: {
                sender: true,
                company: true,
                contact: true,
                lead: true,
                deal: true,
            },
        });
    }
    async findAll(tenantId, filters) {
        return prisma_service_1.default.communication.findMany({
            where: {
                tenantId,
                ...(filters?.companyId && {
                    companyId: filters.companyId,
                }),
                ...(filters?.contactId && {
                    contactId: filters.contactId,
                }),
                ...(filters?.leadId && {
                    leadId: filters.leadId,
                }),
                ...(filters?.dealId && {
                    dealId: filters.dealId,
                }),
                ...(filters?.senderId && {
                    senderId: filters.senderId,
                }),
                ...(filters?.channel && {
                    channel: filters.channel,
                }),
                ...(filters?.direction && {
                    direction: filters.direction,
                }),
                ...(filters?.status && {
                    status: filters.status,
                }),
                deletedAt: null,
            },
            include: {
                sender: true,
                company: true,
                contact: true,
                lead: true,
                deal: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async update(id, updatedBy, data) {
        return prisma_service_1.default.communication.update({
            where: {
                id,
            },
            data: {
                updatedBy,
                ...data,
            },
        });
    }
    async markSent(id) {
        return prisma_service_1.default.communication.update({
            where: {
                id,
            },
            data: {
                status: "SENT",
                sentAt: new Date(),
            },
        });
    }
    async markDelivered(id) {
        return prisma_service_1.default.communication.update({
            where: {
                id,
            },
            data: {
                status: "DELIVERED",
                deliveredAt: new Date(),
            },
        });
    }
    async markRead(id) {
        return prisma_service_1.default.communication.update({
            where: {
                id,
            },
            data: {
                status: "READ",
                readAt: new Date(),
            },
        });
    }
    async softDelete(id, updatedBy) {
        return prisma_service_1.default.communication.update({
            where: {
                id,
            },
            data: {
                updatedBy,
                deletedAt: new Date(),
            },
        });
    }
}
exports.CommunicationRepository = CommunicationRepository;
//# sourceMappingURL=communication.repository.js.map