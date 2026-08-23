"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationController = void 0;
const communication_service_1 = require("../services/communication.service");
class CommunicationController {
    service = new communication_service_1.CommunicationService();
    create = async (req, res) => {
        const result = await this.service.create(req.user.tenantId, req.user.id, req.body);
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
    getByPublicId = async (req, res) => {
        const result = await this.service.getByPublicId(req.params.publicId);
        return res.json(result);
    };
    update = async (req, res) => {
        const result = await this.service.update(req.params.id, req.user.id, req.body);
        return res.json(result);
    };
    markSent = async (req, res) => {
        const result = await this.service.markSent(req.params.id);
        return res.json(result);
    };
    markDelivered = async (req, res) => {
        const result = await this.service.markDelivered(req.params.id);
        return res.json(result);
    };
    markRead = async (req, res) => {
        const result = await this.service.markRead(req.params.id);
        return res.json(result);
    };
    delete = async (req, res) => {
        await this.service.delete(req.params.id, req.user.id);
        return res.json({
            success: true,
            message: "Communication deleted successfully."
        });
    };
}
exports.CommunicationController = CommunicationController;
//# sourceMappingURL=communication.controller.js.map