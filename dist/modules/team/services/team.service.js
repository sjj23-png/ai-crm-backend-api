"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const team_repository_1 = require("../repositories/team.repository");
class TeamService {
    repository = new team_repository_1.TeamRepository();
    async create(tenantId, dto) {
        if (dto.departmentId) {
            const existingTeam = await this.repository.findByDepartmentAndName(dto.departmentId, dto.name);
            if (existingTeam) {
                throw new Error("Team already exists in this department.");
            }
        }
        return this.repository.create(tenantId, dto);
    }
    async getAll(tenantId, filters) {
        return this.repository.findAll(tenantId, filters);
    }
    async getById(id) {
        const team = await this.repository.findById(id);
        if (!team) {
            throw new Error("Team not found.");
        }
        return team;
    }
    async update(id, dto) {
        await this.getById(id);
        if (dto.departmentId &&
            dto.name) {
            const existingTeam = await this.repository.findByDepartmentAndName(dto.departmentId, dto.name);
            if (existingTeam &&
                existingTeam.id !== id) {
                throw new Error("Team already exists in this department.");
            }
        }
        return this.repository.update(id, dto);
    }
    async delete(id) {
        await this.getById(id);
        return this.repository.delete(id);
    }
}
exports.TeamService = TeamService;
//# sourceMappingURL=team.service.js.map