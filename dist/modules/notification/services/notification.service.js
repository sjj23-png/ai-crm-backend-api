"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const notification_repository_1 = require("../repositories/notification.repository");
class NotificationService {
    repository = new notification_repository_1.NotificationRepository();
    async create(tenantId, dto) {
        return this.repository.create(tenantId, dto);
    }
    async getAll(tenantId, filters) {
        return this.repository.findAll(tenantId, filters);
    }
    async getById(id) {
        const notification = await this.repository.findById(id);
        if (!notification) {
            throw new Error("Notification not found.");
        }
        return notification;
    }
    async update(id, dto) {
        await this.getById(id);
        return this.repository.update(id, dto);
    }
    async markAsRead(id) {
        await this.getById(id);
        return this.repository.markAsRead(id);
    }
    async delete(id) {
        await this.getById(id);
        return this.repository.delete(id);
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map