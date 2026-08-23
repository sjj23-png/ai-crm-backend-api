"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class PermissionRepository {
    async create(data) {
        return prisma_service_1.default.permission.create({
            data,
        });
    }
    async findByCode(tenantId, code) {
        return prisma_service_1.default.permission.findUnique({
            where: {
                tenantId_code: {
                    tenantId,
                    code,
                },
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.permission.findUnique({
            where: { id },
        });
    }
    async findAll(tenantId) {
        return prisma_service_1.default.permission.findMany({
            where: {
                tenantId
            },
            orderBy: {
                createdAt: "asc"
            }
        });
    }
    async update(id, data) {
        return prisma_service_1.default.permission.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id) {
        return prisma_service_1.default.permission.delete({
            where: { id },
        });
    }
}
exports.PermissionRepository = PermissionRepository;
//# sourceMappingURL=permission.repository.js.map