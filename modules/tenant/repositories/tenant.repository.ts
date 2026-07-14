import prisma from "../../../database/prisma.service";

export class TenantRepository {
  async create(data: {
    name: string;
    code: string;
    domain?: string;
  }) {
    return prisma.tenant.create({
      data,
    });
  }

  async findByCode(code: string) {
    return prisma.tenant.findUnique({
      where: { code },
    });
  }

  async findById(id: string) {
    return prisma.tenant.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return prisma.tenant.findMany({
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
      domain?: string;
    }
  ) {
    return prisma.tenant.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.tenant.delete({
      where: { id },
    });
  }
}