"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamController = void 0;
const team_service_1 = require("../services/team.service");
class TeamController {
    service = new team_service_1.TeamService();
    create = async (req, res) => {
        try {
            const result = await this.service.create(req.body);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message
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
            return res.status(404).json({
                message: error.message
            });
        }
    };
}
exports.TeamController = TeamController;
//# sourceMappingURL=team.controller.js.map