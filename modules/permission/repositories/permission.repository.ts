import prisma from "../../../database/prisma.service";
import { UpdatePermissionDto } from "../dto/update-permission.dto";



export class PermissionRepository {
  async create(data: {
    tenantId: string;
    name: string;
    code: string;
    description?: string;
  }) {
    return prisma.permission.create({
      data,
    });
  }

  async findByCode(tenantId: string,
    code: string) {
    return prisma.permission.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code,
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.permission.findUnique({
      where: { id },
    });
  }

  async findAll(
    tenantId: string
  ) {

    return prisma.permission.findMany({

      where: {
        tenantId
      },

      orderBy: {
        createdAt: "asc"
      }

    });

  }




























  async update(
    id: string,
    data: UpdatePermissionDto
  ) {
    return prisma.permission.update({
      where: {
        id,
      },
      data,
    });
  }
  async delete(id: string) {
    return prisma.permission.delete({
      where: { id },
    });
  }
}