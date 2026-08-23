"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageController = void 0;
const stage_service_1 = require("../services/stage.service");
class StageController {
    service = new stage_service_1.StageService();
    create = async (req, res) => {
        try {
            const result = await this.service.create(req.body);
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
    getPipelineStages = async (req, res) => {
        const result = await this.service.getPipelineStages(req.params.pipelineId);
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
exports.StageController = StageController;
//# sourceMappingURL=stage.controller.js.map