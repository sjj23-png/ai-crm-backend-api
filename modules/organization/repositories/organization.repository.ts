import prisma from "../../../database/prisma.service";

export class OrganizationRepository {

  async create(data: {
    tenantId: string;
    name: string;
    code: string;
    description?: string;
  }) {
    return prisma.organization.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.organization.findUnique({
      where: { id },
    });
  }

  async findByCode(
    tenantId: string,
    code: string
  ) {
    return prisma.organization.findFirst({
      where: {
        tenantId,
        code,
      },
    });
  }

  async findAll(tenantId: string) {
    return prisma.organization.findMany({
      where: {
        tenantId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      code?: string;
      description?: string;
    }
  ) {
    return prisma.organization.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.organization.delete({
      where: {
        id,
      },
    });
  }

}