"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../../database/prisma.service"));
const client_1 = require("@prisma/client");
class TaskRepository {
    async create(data) {
        return prisma_service_1.default.task.create({
            data: {
                publicId: data.publicId,
                tenantId: data.tenantId,
                title: data.title,
                description: data.description,
                completed: data.status === client_1.TaskStatus.COMPLETED,
                priority: data.priority,
                dueDate: data.dueDate,
                companyId: data.companyId,
                dealId: data.dealId,
                stageId: data.stageId || "",
                assignedUserId: data.assignedTo,
            },
            include: {
                assignee: true,
                company: true,
                deal: true,
                taskTags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }
    async findById(id) {
        return prisma_service_1.default.task.findUnique({
            where: {
                id,
            },
            include: {
                assignee: true,
                company: true,
                deal: true,
                taskTags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }
    async findAll(tenantId) {
        return prisma_service_1.default.task.findMany({
            where: {
                tenantId,
                deletedAt: null,
            },
            include: {
                assignee: true,
                company: true,
                deal: true,
                taskTags: {
                    include: {
                        tag: true,
                    },
                },
            },
            orderBy: {
                dueDate: "asc",
            },
        });
    }
    async update(id, data) {
        return prisma_service_1.default.task.update({
            where: {
                id
            },
            data
        });
    }
    async delete(id) {
        return prisma_service_1.default.task.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map