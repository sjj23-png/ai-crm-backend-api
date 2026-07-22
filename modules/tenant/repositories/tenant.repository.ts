import prisma from "../../../database/prisma.service";
import { CreateTenantDto } from "../dto/create-tenant.dto";

export class TenantRepository {
    async create(data: CreateTenantDto) {
    return prisma.tenant.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return prisma.tenant.findUnique({
      where: { 
        email, 
      },
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