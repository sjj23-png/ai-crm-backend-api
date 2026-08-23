"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class TeamRepository {
    async create(tenantId, data) {
        return prisma_service_1.default.team.create({
            data: {
                tenantId,
                name: data.name,
                description: data.description,
                leadId: data.leadId,
                departmentId: data.departmentId || "",
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.team.findUnique({
            where: {
                id,
            },
            include: {
                department: true,
                lead: true,
                members: true,
                companies: true,
            },
        });
    }
    async findByDepartmentAndName(departmentId, name) {
        return prisma_service_1.default.team.findFirst({
            where: {
                departmentId,
                name,
            },
        });
    }
    async findAll(tenantId, filters) {
        return prisma_service_1.default.team.findMany({
            where: {
                tenantId,
                ...(filters?.departmentId && {
                    departmentId: filters.departmentId,
                }),
                ...(filters?.leadId && {
                    leadId: filters.leadId,
                }),
                ...(filters?.status && {
                    status: filters.status,
                }),
                ...(filters?.search && {
                    name: {
                        contains: filters.search,
                        mode: "insensitive",
                    },
                }),
            },
            include: {
                department: true,
                lead: true,
                members: true,
                companies: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
    }
    async update(id, data) {
        return prisma_service_1.default.team.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id) {
        return prisma_service_1.default.team.delete({
            where: {
                id,
            },
        });
    }
}
exports.TeamRepository = TeamRepository;
//# sourceMappingURL=team.repository.js.map