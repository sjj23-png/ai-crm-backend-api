"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const client_1 = require("@prisma/client");
const task_repository_1 = require("../repositories/task.repository");
class TaskService {
    repository = new task_repository_1.TaskRepository();
    async create(dto) {
        return this.repository.create({
            ...dto,
            publicId: `TSK-${Date.now()}`,
            status: dto.status
                ? dto.status
                : client_1.TaskStatus.PENDING,
            priority: dto.priority
                ? dto.priority
                : client_1.TaskPriority.MEDIUM
        });
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const task = await this.repository.findById(id);
        if (!task) {
            throw new Error("Task not found.");
        }
        return task;
    }
    async update(id, dto) {
        await this.getById(id);
        return this.repository.update(id, dto);
    }
    async delete(id) {
        await this.getById(id);
        await this.repository.delete(id);
        return {
            message: "Task deleted successfully."
        };
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map