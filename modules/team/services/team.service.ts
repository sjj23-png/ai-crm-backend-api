import { CreateTeamDto } from "../dto/create-team.dto";
import { UpdateTeamDto } from "../dto/update-team.dto";

import { TeamRepository } from "../repositories/team.repository";
import { TeamFilters } from "../types/team.types";

export class TeamService {

  private repository =
    new TeamRepository();

  async create(
    tenantId: string,
    dto: CreateTeamDto
  ) {

    const existingTeam =
      await this.repository.findByDepartmentAndName(
        dto.departmentId,
        dto.name
      );

    if (existingTeam) {
      throw new Error(
        "Team already exists in this department."
      );
    }

    return this.repository.create(
      tenantId,
      dto
    );

  }

  async getAll(
    tenantId: string,
    filters?: TeamFilters
  ) {

    return this.repository.findAll(
      tenantId,
      filters
    );

  }

  async getById(
    id: string
  ) {

    const team =
      await this.repository.findById(id);

    if (!team) {
      throw new Error(
        "Team not found."
      );
    }

    return team;

  }

  async update(
    id: string,
    dto: UpdateTeamDto
  ) {

    await this.getById(id);

    if (
      dto.departmentId &&
      dto.name
    ) {

      const existingTeam =
        await this.repository.findByDepartmentAndName(
          dto.departmentId,
          dto.name
        );

      if (
        existingTeam &&
        existingTeam.id !== id
      ) {

        throw new Error(
          "Team already exists in this department."
        );

      }

    }

    return this.repository.update(
      id,
      dto
    );

  }

  async delete(
    id: string
  ) {

    await this.getById(id);

    return this.repository.delete(id);

  }

}