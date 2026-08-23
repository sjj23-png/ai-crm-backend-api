"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class NotificationRepository {
    async create(tenantId, data) {
        return prisma_service_1.default.notification.create({
            data: {
                tenantId,
                status: data.status ?? "PENDING",
                ...data,
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.notification.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });
    }
    async findAll(tenantId, filters) {
        return prisma_service_1.default.notification.findMany({
            where: {
                tenantId,
                ...(filters?.userId && {
                    userId: filters.userId,
                }),
                ...(filters?.type && {
                    type: filters.type,
                }),
                ...(filters?.channel && {
                    channel: filters.channel,
                }),
                ...(filters?.status && {
                    status: filters.status,
                }),
            },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async update(id, data) {
        return prisma_service_1.default.notification.update({
            where: {
                id,
            },
            data,
        });
    }
    async markAsRead(id) {
        return prisma_service_1.default.notification.update({
            where: {
                id,
            },
            data: {
                status: "READ",
                readAt: new Date(),
            },
        });
    }
    async delete(id) {
        return prisma_service_1.default.notification.delete({
            where: {
                id,
            },
        });
    }
}
exports.NotificationRepository = NotificationRepository;
//# sourceMappingURL=notification.repository.js.map