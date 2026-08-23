"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignationRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class DesignationRepository {
    create(data) {
        return prisma_service_1.default.designation.create({
            data
        });
    }
    findByName(tenantId, name) {
        return prisma_service_1.default.designation.findFirst({
            where: {
                tenantId,
                name
            }
        });
    }
    findById(id) {
        return prisma_service_1.default.designation.findUnique({
            where: {
                id
            }
        });
    }
    findAll(tenantId) {
        return prisma_service_1.default.designation.findMany({
            where: {
                tenantId
            },
            orderBy: {
                name: "asc"
            }
        });
    }
    update(id, data) {
        return prisma_service_1.default.designation.update({
            where: {
                id
            },
            data
        });
    }
    delete(id) {
        return prisma_service_1.default.designation.delete({
            where: {
                id
            }
        });
    }
}
exports.DesignationRepository = DesignationRepository;
//# sourceMappingURL=designation.repository.js.map