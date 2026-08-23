"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class UserRepository {
    create(data) {
        return prisma_service_1.default.user.create({
            data,
            include: {
                tenant: true,
                role: true,
                team: true,
                designation: true,
                profile: true,
            },
        });
    }
    findById(id) {
        return prisma_service_1.default.user.findUnique({
            where: { id },
            include: {
                tenant: true,
                role: true,
                team: true,
                designation: true,
                profile: true,
            }
        });
    }
    findByEmail(email) {
        return prisma_service_1.default.user.findUnique({
            where: { email }
        });
    }
    findAll(tenantId) {
        return prisma_service_1.default.user.findMany({
            where: {
                tenantId
            },
            include: {
                role: true,
                team: true,
                designation: true,
                profile: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }
    update(id, data) {
        return prisma_service_1.default.user.update({
            where: { id },
            data
        });
    }
    delete(id) {
        return prisma_service_1.default.user.update({
            where: {
                id,
            },
            data: {
                status: "INACTIVE",
            },
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map