"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignationRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class DesignationRepository {
    async create(tenantId, data) {
        return prisma_service_1.default.designation.create({
            data: {
                tenantId,
                ...data,
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.designation.findUnique({
            where: {
                id,
            },
        });
    }
    async findByTenantAndName(tenantId, name) {
        return prisma_service_1.default.designation.findFirst({
            where: {
                tenantId,
                name,
            },
        });
    }
    async findAll(tenantId) {
        return prisma_service_1.default.designation.findMany({
            where: {
                tenantId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
    }
    async update(id, data) {
        return prisma_service_1.default.designation.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id) {
        return prisma_service_1.default.designation.delete({
            where: {
                id,
            },
        });
    }
}
exports.DesignationRepository = DesignationRepository;
//# sourceMappingURL=designation.repository.js.map