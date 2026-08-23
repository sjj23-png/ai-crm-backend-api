"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignationController = void 0;
const designation_service_1 = require("../services/designation.service");
class DesignationController {
    service = new designation_service_1.DesignationService();
    create = async (req, res) => {
        try {
            const result = await this.service.create(req.user.tenantId, req.body);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    };
    getAll = async (req, res) => {
        try {
            const result = await this.service.getAll(req.user.tenantId);
            return res.json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    };
    getById = async (req, res) => {
        try {
            const result = await this.service.getById(req.params.id);
            return res.json(result);
        }
        catch (error) {
            return res.status(404).json({
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
            return res.status(400).json({
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
            return res.status(400).json({
                message: error.message,
            });
        }
    };
}
exports.DesignationController = DesignationController;
//# sourceMappingURL=designation.controller.js.map