"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const activity_repository_1 = require("../repositories/activity.repository");
class ActivityService {
    repository = new activity_repository_1.ActivityRepository();
    async create(dto) {
        return this.repository.create({
            ...dto,
            publicId: `ACT-${Date.now()}`,
            type: dto.type,
        });
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const activity = await this.repository.findById(id);
        if (!activity) {
            throw new Error("Activity not found.");
        }
        return activity;
    }
    async update(id, dto) {
        await this.getById(id);
        return this.repository.update(id, dto);
    }
    async delete(id) {
        await this.getById(id);
        await this.repository.delete(id);
        return {
            message: "Activity deleted successfully."
        };
    }
}
exports.ActivityService = ActivityService;
//# sourceMappingURL=activity.service.js.map