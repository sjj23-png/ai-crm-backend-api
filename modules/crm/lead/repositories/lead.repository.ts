import prisma from "../../../../database/prisma.service";


import {
  LeadStatus,
} from "@prisma/client";

import {
  CreateLeadDto,
} from "../dto/create-lead.dto";

import {
  UpdateLeadDto,
} from "../dto/update-lead.dto";

export class LeadRepository {

  async create(
    data: CreateLeadDto & {
      publicId: string;
      tenantId: string;
      ownerId: string;
      teamId: string;
      status: LeadStatus;
      score: number;
    }
  ) {
    return prisma.lead.create({
      data: {
        publicId: data.publicId,
        tenantId: data.tenantId,
        ownerId: data.ownerId,
        teamId: data.teamId,
        companyId: data.companyId,
        contactId: data.contactId,
        pipelineId: data.pipelineId,
        stageId: data.stageId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        source: data.source,
        status: data.status,
        score: data.score,
        estimatedValue: data.estimatedValue,
        expectedCloseDate: data.expectedCloseDate,
      },
      include: {
        company: true,
        contact: true,
        owner: true,
        team: true,
        pipeline: true,
        stage: true,
      },
    });
  }

  async findById(
    id: string
  ) {

    return prisma.lead.findUnique({

      where: {
        id,
      },

      include: {

        company: true,

        contact: true,

        owner: true,

        team: true,

        pipeline: true,

        stage: true,

        activities: true,

        notes: true,

        communications: true,

      },

    });

  }

  async findByEmail(

    tenantId: string,

    email: string

  ) {

    return prisma.lead.findFirst({

      where: {

        tenantId,

        email,

      },

    });

  }

  async findAll(

    tenantId: string

  ) {

    return prisma.lead.findMany({

      where: {

        tenantId,

        deletedAt: null,

      },

      include: {

        company: true,

        contact: true,

        owner: true,

        team: true,

        pipeline: true,

        stage: true,

      },

      orderBy: {

        createdAt: "desc",

      },

    });

  }

  async update(

    id: string,

    data: UpdateLeadDto

  ) {

    return prisma.lead.update({

      where: {

        id,

      },

      data,

    });

  }

  async delete(

    id: string

  ) {

    return prisma.lead.update({

      where: {

        id,

      },

      data: {

        deletedAt:
          new Date(),

      },

    });

  }

}