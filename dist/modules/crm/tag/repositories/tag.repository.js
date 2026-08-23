"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../../database/prisma.service"));
class TagRepository {
    create(data) {
        return prisma_service_1.default.tag.create({
            data
        });
    }
    findByName(tenantId, name) {
        return prisma_service_1.default.tag.findFirst({
            where: {
                tenantId,
                name,
            },
        });
    }
    findAll(tenantId) {
        return prisma_service_1.default.tag.findMany({
            where: {
                tenantId,
            },
            orderBy: {
                name: "asc",
            },
        });
    }
    update(id, data) {
        return prisma_service_1.default.tag.update({
            where: { id },
            data,
        });
    }
    softDelete(id) {
        return prisma_service_1.default.tag.delete({
            where: { id },
        });
    }
}
exports.TagRepository = TagRepository;
//# sourceMappingURL=tag.repository.js.map