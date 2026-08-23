"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class DepartmentRepository {
    async create(tenantId, data) {
        return prisma_service_1.default.department.create({
            data: {
                tenantId,
                ...data,
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.department.findUnique({
            where: {
                id,
            },
            include: {
                teams: true,
            },
        });
    }
    async findByCode(tenantId, code) {
        return prisma_service_1.default.department.findFirst({
            where: {
                tenantId,
                code,
            },
        });
    }
    async findByName(tenantId, name) {
        return prisma_service_1.default.department.findFirst({
            where: {
                tenantId,
                name,
            },
        });
    }
    async findAll(tenantId) {
        return prisma_service_1.default.department.findMany({
            where: {
                tenantId,
            },
            include: {
                teams: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
    }
    async update(id, data) {
        return prisma_service_1.default.department.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id) {
        return prisma_service_1.default.department.delete({
            where: {
                id,
            },
        });
    }
}
exports.DepartmentRepository = DepartmentRepository;
//# sourceMappingURL=department.repository.js.map