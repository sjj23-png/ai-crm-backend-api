import prisma from "../../../database/prisma.service";

import { CreateTeamDto } from "../dto/create-team.dto";
import { UpdateTeamDto } from "../dto/update-team.dto";
import { TeamFilters } from "../types/team.types";

export class TeamRepository {

  async create(
    tenantId: string,
    data: CreateTeamDto
  ) {
    return prisma.team.create({
      data: {
        tenantId,
        name: data.name,
        description: data.description,
        leadId: data.leadId,
        departmentId: data.departmentId || "",
      },
    });
  }

  async findById(
    id: string
  ) {

    return prisma.team.findUnique({

      where: {
        id,
      },

      include: {
        department: true,
        lead: true,
        members: true,
        companies: true,
      },

    });

  }

  async findByDepartmentAndName(
    departmentId: string,
    name: string
  ) {

    return prisma.team.findFirst({

      where: {
        departmentId,
        name,
      },

    });

  }

  async findAll(
    tenantId: string,
    filters?: TeamFilters
  ) {

    return prisma.team.findMany({

      where: {

        tenantId,

        ...(filters?.departmentId && {
          departmentId: filters.departmentId,
        }),

        ...(filters?.leadId && {
          leadId: filters.leadId,
        }),

        ...(filters?.status && {
          status: filters.status,
        }),

        ...(filters?.search && {
          name: {
            contains: filters.search,
            mode: "insensitive",
          },
        }),

      },

      include: {
        department: true,
        lead: true,
        members: true,
        companies: true,
      },

      orderBy: {
        createdAt: "asc",
      },

    });

  }

  async update(
    id: string,
    data: UpdateTeamDto
  ) {

    return prisma.team.update({

      where: {
        id,
      },

      data,

    });

  }

  async delete(
    id: string
  ) {

    return prisma.team.delete({

      where: {
        id,
      },

    });

  }

}