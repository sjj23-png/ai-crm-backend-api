"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../../database/prisma.service"));
class ActivityRepository {
    async create(data) {
        return prisma_service_1.default.activity.create({
            data,
            include: {
                company: true,
                lead: true,
                deal: true
            }
        });
    }
    async findById(id) {
        return prisma_service_1.default.activity.findUnique({
            where: {
                id
            },
            include: {
                company: true,
                lead: true,
                deal: true
            }
        });
    }
    async findAll(tenantId) {
        return prisma_service_1.default.activity.findMany({
            where: {
                tenantId,
                deletedAt: null
            },
            include: {
                company: true,
                lead: true,
                deal: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }
    async update(id, data) {
        return prisma_service_1.default.activity.update({
            where: {
                id
            },
            data
        });
    }
    async delete(id) {
        return prisma_service_1.default.activity.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
}
exports.ActivityRepository = ActivityRepository;
//# sourceMappingURL=activity.repository.js.map