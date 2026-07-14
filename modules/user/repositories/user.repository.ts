import prisma from "../../../database/prisma.service";
import { UpdateUserDto } from "../dto/update-user.dto";

export class UserRepository {

  create(data: {
    name: string;
    email: string;
    passwordHash: string;
    tenantId: string;
    roleId: string;
    teamId?: string;
    designationId?: string;
  }) {

    return prisma.user.create({

      data,

      include: {

        tenant: true,

        role: true,

        team: true,

        designation: true,

        profile: true,

      },

    });

  }

  findById(id: string) {

    return prisma.user.findUnique({

      where: { id },

      include: {

        tenant: true,

        role: true,

        team: true,

        designation: true,

        profile: true,

      }

    });

  }

  findByEmail(email: string) {

    return prisma.user.findUnique({

      where: { email }

    });

  }

  findAll(tenantId: string) {

    return prisma.user.findMany({

      where: {
        tenantId
      },

      include: {

        role: true,

        team: true,

        designation: true,

        profile: true,

      },

      orderBy: {
        createdAt: "desc"
      }

    });

  }

  update(id: string, data: UpdateUserDto) {

    return prisma.user.update({

      where: { id },

      data

    });

  }

  delete(id: string) {

    return prisma.user.update({

      where: {

        id,

      },

      data: {

        status: "INACTIVE",

      },

    });

  }

}