import prisma from "../../../database/prisma.service";

import {
  CreateDepartmentDto,
} from "../dto/create-department.dto";

import {
  UpdateDepartmentDto,
} from "../dto/update-department.dto";

export class DepartmentRepository {

  async create(
    tenantId: string,
    data: CreateDepartmentDto
  ) {
    return prisma.department.create({
      data: {
        tenantId,
        ...data,
      },
    });
  }

  async findById(id: string) {
    return prisma.department.findUnique({
      where: {
        id,
      },
      include: {
        teams: true,
      },
    });
  }

  async findByCode(
    tenantId: string,
    code: string
  ) {
    return prisma.department.findFirst({
      where: {
        tenantId,
        code,
      },
    });
  }

  async findByName(
    tenantId: string,
    name: string
  ) {
    return prisma.department.findFirst({
      where: {
        tenantId,
        name,
      },
    });
  }

  async findAll(
    tenantId: string
  ) {
    return prisma.department.findMany({
      where: {
        tenantId,
      },
      include: {
        teams: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async update(
    id: string,
    data: UpdateDepartmentDto
  ) {
    return prisma.department.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.department.delete({
      where: {
        id,
      },
    });
  }

}