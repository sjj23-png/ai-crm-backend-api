"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class TeamRepository {
    create(data) {
        return prisma_service_1.default.team.create({
            data
        });
    }
    findById(id) {
        return prisma_service_1.default.team.findUnique({
            where: {
                id
            },
            include: {
                department: true,
                lead: true,
                members: true
            }
        });
    }
    findByName(name, departmentId) {
        return prisma_service_1.default.team.findFirst({
            where: {
                name,
                departmentId
            }
        });
    }
    findAll(tenantId) {
        return prisma_service_1.default.team.findMany({
            where: {
                tenantId
            },
            include: {
                department: true,
                lead: true
            },
            orderBy: {
                createdAt: "asc"
            }
        });
    }
    update(id, data) {
        return prisma_service_1.default.team.update({
            where: {
                id
            },
            data
        });
    }
    delete(id) {
        return prisma_service_1.default.team.delete({
            where: {
                id
            }
        });
    }
}
exports.TeamRepository = TeamRepository;
//# sourceMappingURL=team.repository.js.map