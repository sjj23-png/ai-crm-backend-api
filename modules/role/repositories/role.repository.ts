import prisma from "../../../database/prisma.service";
import { RoleStatus } from "@prisma/client";


export class RoleRepository {
async create(data: {
  name: string;
  code: string;
  description?: string;
  tenantId: string;
}) {
  return prisma.role.create({
    data,
  });
}

  async findById(id: string) {
    return prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  async findByName(name: string, tenantId: string) {
    return prisma.role.findFirst({
      where: {
        name,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return prisma.role.findMany({
      where: {
        tenantId,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async delete(id: string) {
    return prisma.role.delete({
      where: {
        id,
      },
    });
  }









  
async update(
  id: string,
  data: {
    name?: string;
    code?: string;
    description?: string;
    status?: RoleStatus;
  }
) {
  return prisma.role.update({
    where: {
      id,
    },
    data,
  });
}


}