"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamController = void 0;
const team_service_1 = require("../services/team.service");
class TeamController {
    service = new team_service_1.TeamService();
    create = async (req, res) => {
        try {
            const result = await this.service.create(req.user.tenantId, req.body);
            return res.status(201).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to create team.",
            });
        }
    };
    getAll = async (req, res) => {
        try {
            const result = await this.service.getAll(req.user.tenantId, req.query);
            return res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to fetch teams.",
            });
        }
    };
    getById = async (req, res) => {
        try {
            const result = await this.service.getById(req.params.id);
            return res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to fetch team details.",
            });
        }
    };
    update = async (req, res) => {
        try {
            const result = await this.service.update(req.params.id, req.body);
            return res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to update team.",
            });
        }
    };
    delete = async (req, res) => {
        try {
            await this.service.delete(req.params.id);
            return res.json({
                success: true,
                message: "Team deleted successfully."
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to delete team.",
            });
        }
    };
}
exports.TeamController = TeamController;
//# sourceMappingURL=team.controller.js.map