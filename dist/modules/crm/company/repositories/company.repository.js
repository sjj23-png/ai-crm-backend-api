"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../../database/prisma.service"));
class CompanyRepository {
    create(data) {
        return prisma_service_1.default.company.create({
            data
        });
    }
    findById(id) {
        return prisma_service_1.default.company.findUnique({
            where: { id },
            include: {
                owner: true,
                team: true,
                contacts: true,
                deals: true
            }
        });
    }
    findByName(tenantId, name) {
        return prisma_service_1.default.company.findFirst({
            where: {
                tenantId,
                name
            }
        });
    }
    findAll(tenantId) {
        return prisma_service_1.default.company.findMany({
            where: {
                tenantId
            },
            include: {
                owner: true,
                team: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }
    async update(id, data) {
        return prisma_service_1.default.company.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id) {
        return prisma_service_1.default.company.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
                status: "INACTIVE",
            },
        });
    }
}
exports.CompanyRepository = CompanyRepository;
//# sourceMappingURL=company.repository.js.map