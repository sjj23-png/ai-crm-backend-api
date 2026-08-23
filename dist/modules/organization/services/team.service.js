"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const team_repository_1 = require("../repositories/team.repository");
class TeamService {
    repository = new team_repository_1.TeamRepository();
    async create(data) {
        const exists = await this.repository.findByName(data.name, data.departmentId);
        if (exists) {
            throw new Error("Team already exists.");
        }
        return this.repository.create(data);
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const team = await this.repository.findById(id);
        if (!team) {
            throw new Error("Team not found.");
        }
        return team;
    }
    async update(id, data) {
        return this.repository.update(id, data);
    }
    async delete(id) {
        await this.repository.delete(id);
        return {
            message: "Team deleted successfully."
        };
    }
}
exports.TeamService = TeamService;
//# sourceMappingURL=team.service.js.map