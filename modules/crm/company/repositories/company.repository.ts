import prisma from "../../../../database/prisma.service";


export class CompanyRepository {




  create(data: {
    publicId: string;
    tenantId: string;
    teamId?: string | null;
    ownerId?: string | null;
    name: string;
    industry?: string | null;
    website?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    postalCode?: string | null;
    companySize?: string | null;
    description?: string | null;
    status: string;
  }) {
    return prisma.company.create({
      data
    });
  }

  findById(id: string) {
    return prisma.company.findUnique({
      where: { id },
      include: {
        owner: true,
        team: true,
        contacts: true,
        deals: true
      }
    });
  }

  findByName(
    tenantId: string,
    name: string
  ) {
    return prisma.company.findFirst({
      where: {
        tenantId,
        name
      }
    });
  }

  findAll(tenantId: string) {
    return prisma.company.findMany({
      where: {
        tenantId
      },
      include: {
        owner: true,
        team: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async update(
    id: string,
    data: {
      teamId?: string | null;
      ownerId?: string | null;
      name?: string;
      industry?: string | null;
      website?: string | null;
      email?: string | null;
      phone?: string | null;
      address?: string | null;
      city?: string | null;
      state?: string | null;
      country?: string | null;
      postalCode?: string | null;
      companySize?: string | null;
      description?: string | null;
      status?: string;
    }
  ) {

    return prisma.company.update({

      where: {
        id,
      },

      data,

    });

  }

  async delete(id: string) {

    return prisma.company.update({

      where: {
        id,
      },

      data: {
        deletedAt: new Date(),
        status: "INACTIVE",
      },

    });

  }

}