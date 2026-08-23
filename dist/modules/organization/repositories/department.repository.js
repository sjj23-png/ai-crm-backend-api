"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class DepartmentRepository {
    create(data) {
        return prisma_service_1.default.department.create({
            data
        });
    }
    findById(id) {
        return prisma_service_1.default.department.findUnique({
            where: { id }
        });
    }
    findByName(name, tenantId) {
        return prisma_service_1.default.department.findFirst({
            where: {
                name,
                tenantId
            }
        });
    }
    findAll(tenantId) {
        return prisma_service_1.default.department.findMany({
            where: {
                tenantId
            },
            orderBy: {
                createdAt: "asc"
            }
        });
    }
    delete(id) {
        return prisma_service_1.default.department.delete({
            where: { id }
        });
    }
}
exports.DepartmentRepository = DepartmentRepository;
//# sourceMappingURL=department.repository.js.map