"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class RoleRepository {
    async create(data) {
        return prisma_service_1.default.role.create({
            data,
        });
    }
    async findById(id) {
        return prisma_service_1.default.role.findUnique({
            where: { id },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
        });
    }
    async findByName(name, tenantId) {
        return prisma_service_1.default.role.findFirst({
            where: {
                name,
                tenantId,
            },
        });
    }
    async findAll(tenantId) {
        return prisma_service_1.default.role.findMany({
            where: {
                tenantId,
            },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async delete(id) {
        return prisma_service_1.default.role.delete({
            where: {
                id,
            },
        });
    }
    async update(id, data) {
        return prisma_service_1.default.role.update({
            where: {
                id,
            },
            data,
        });
    }
}
exports.RoleRepository = RoleRepository;
//# sourceMappingURL=role.repository.js.map