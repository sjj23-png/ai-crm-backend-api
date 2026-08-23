"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../../database/prisma.service"));
class ContactRepository {
    async create(data) {
        return prisma_service_1.default.contact.create({
            data: {
                publicId: data.publicId,
                tenantId: data.tenantId,
                companyId: data.companyId,
                ownerId: data.ownerId,
                teamId: data.teamId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                department: data.department,
                status: data.status ?? "ACTIVE",
            },
            include: {
                company: true,
                owner: true,
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.contact.findUnique({
            where: {
                id,
            },
            include: {
                company: true,
                owner: true,
                communications: true,
            },
        });
    }
    async findByEmail(tenantId, email) {
        return prisma_service_1.default.contact.findFirst({
            where: {
                tenantId,
                email,
            },
        });
    }
    async findByCompany(companyId) {
        return prisma_service_1.default.contact.findMany({
            where: {
                companyId,
            },
            include: {
                company: true,
                owner: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async findAll(tenantId) {
        return prisma_service_1.default.contact.findMany({
            where: {
                tenantId,
            },
            include: {
                company: true,
                owner: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async update(id, data) {
        return prisma_service_1.default.contact.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id) {
        return prisma_service_1.default.contact.update({
            where: {
                id,
            },
            data: {
                status: "INACTIVE",
            },
        });
    }
}
exports.ContactRepository = ContactRepository;
//# sourceMappingURL=contact.repository.js.map