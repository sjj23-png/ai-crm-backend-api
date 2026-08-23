"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadController = void 0;
const lead_service_1 = require("../services/lead.service");
class LeadController {
    service = new lead_service_1.LeadService();
    create = async (req, res) => {
        try {
            const dto = { ...req.body, tenantId: req.user.tenantId };
            const result = await this.service.create(dto);
            return res
                .status(201)
                .json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({
                message: error.message,
            });
        }
    };
    getAll = async (req, res) => {
        const result = await this.service.getAll(req.user.tenantId);
        return res.json(result);
    };
    getById = async (req, res) => {
        try {
            const result = await this.service.getById(req.params.id);
            return res.json(result);
        }
        catch (error) {
            return res
                .status(404)
                .json({
                message: error.message,
            });
        }
    };
    update = async (req, res) => {
        try {
            const result = await this.service.update(req.params.id, req.body);
            return res.json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({
                message: error.message,
            });
        }
    };
    delete = async (req, res) => {
        try {
            const result = await this.service.delete(req.params.id);
            return res.json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({
                message: error.message,
            });
        }
    };
}
exports.LeadController = LeadController;
//# sourceMappingURL=lead.controller.js.map