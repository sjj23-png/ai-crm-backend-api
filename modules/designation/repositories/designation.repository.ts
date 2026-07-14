import prisma from "../../../database/prisma.service";


import { CreateDesignationDto } from "../dto/create-designation.dto";
import { UpdateDesignationDto } from "../dto/update-designation.dto";

export class DesignationRepository {
  async create(
    tenantId: string,
    data: CreateDesignationDto
  ) {
    return prisma.designation.create({
      data: {
        tenantId,
        ...data,
      },
    });
  }

  async findById(id: string) {
    return prisma.designation.findUnique({
      where: {
        id,
      },
    });
  }

  async findByTenantAndName(
    tenantId: string,
    name: string
  ) {
    return prisma.designation.findFirst({
      where: {
        tenantId,
        name,
      },
    });
  }

  async findAll(tenantId: string) {
    return prisma.designation.findMany({
      where: {
        tenantId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async update(
    id: string,
    data: UpdateDesignationDto
  ) {
    return prisma.designation.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.designation.delete({
      where: {
        id,
      },
    });
  }
}