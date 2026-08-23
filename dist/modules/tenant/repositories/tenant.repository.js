"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class TenantRepository {
    async create(data) {
        return prisma_service_1.default.tenant.create({
            data,
        });
    }
    async findByEmail(email) {
        return prisma_service_1.default.tenant.findUnique({
            where: {
                email,
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.tenant.findUnique({
            where: { id },
        });
    }
    async findAll() {
        return prisma_service_1.default.tenant.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async update(id, data) {
        return prisma_service_1.default.tenant.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma_service_1.default.tenant.delete({
            where: { id },
        });
    }
}
exports.TenantRepository = TenantRepository;
//# sourceMappingURL=tenant.repository.js.map