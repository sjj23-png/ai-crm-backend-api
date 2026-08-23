import prisma from "../../../../database/prisma.service";

import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";

export class ContactRepository {

  async create(
    data: CreateContactDto & {
      publicId: string;
      tenantId: string;
      ownerId: string;
      teamId: string;
      status?: "ACTIVE" | "INACTIVE" | "ARCHIVED";
    }
  ) {
    return prisma.contact.create({
      data: {
        publicId: data.publicId,
        tenantId: data.tenantId,
        companyId: data.companyId,
        ownerId: data.ownerId,
        teamId: data.teamId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        department: data.department,
        status: data.status ?? "ACTIVE",
      },
      include: {
        company: true,
        owner: true,
      },
    });
  }

  async findById(
    id: string
  ) {

    return prisma.contact.findUnique({

      where: {
        id,
      },

      include: {

        company: true,

        owner: true,

        communications: true,

      },

    });

  }

  async findByEmail(
    tenantId: string,
    email: string
  ) {

    return prisma.contact.findFirst({

      where: {

        tenantId,

        email,

      },

    });

  }

  async findByCompany(
    companyId: string
  ) {

    return prisma.contact.findMany({

      where: {
        companyId,
      },

      include: {

        company: true,

        owner: true,

      },

      orderBy: {

        createdAt: "desc",

      },

    });

  }

  async findAll(
    tenantId: string
  ) {

    return prisma.contact.findMany({

      where: {
        tenantId,
      },

      include: {

        company: true,

        owner: true,

      },

      orderBy: {

        createdAt: "desc",

      },

    });

  }

  async update(
    id: string,
    data: UpdateContactDto
  ) {

    return prisma.contact.update({

      where: {
        id,
      },

      data,

    });

  }

  async delete(
    id: string
  ) {

    return prisma.contact.update({

      where: {
        id,
      },

      data: {

        status: "INACTIVE",

      },

    });

  }

}