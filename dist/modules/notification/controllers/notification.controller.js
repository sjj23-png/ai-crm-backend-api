"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_service_1 = require("../services/notification.service");
class NotificationController {
    service = new notification_service_1.NotificationService();
    create = async (req, res) => {
        const result = await this.service.create(req.user.tenantId, req.body);
        return res.status(201).json(result);
    };
    getAll = async (req, res) => {
        const result = await this.service.getAll(req.user.tenantId, req.query);
        return res.json(result);
    };
    getById = async (req, res) => {
        const result = await this.service.getById(req.params.id);
        return res.json(result);
    };
    update = async (req, res) => {
        const result = await this.service.update(req.params.id, req.body);
        return res.json(result);
    };
    markAsRead = async (req, res) => {
        const result = await this.service.markAsRead(req.params.id);
        return res.json(result);
    };
    delete = async (req, res) => {
        await this.service.delete(req.params.id);
        return res.json({
            success: true,
            message: "Notification deleted successfully.",
        });
    };
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map