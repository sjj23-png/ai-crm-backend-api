import prisma from "../../../../database/prisma.service";

import {
  Prisma,
} from "@prisma/client";



import {
  DealStatus,
} from "@prisma/client";
import {
  CreateDealDto,
} from "../dto/create-deal.dto";

import {
  UpdateDealDto,
} from "../dto/update-deal.dto";

export class DealRepository {

  async create(

    data:
    CreateDealDto & {

      publicId: string;

      status: DealStatus;

    }

  ) {

    return prisma.deal.create({

      data,

      include: {

        company: true,

        contact: true,

        stage: true,

        pipeline: true,

        tags: true,

      },

    });

  }

  async findById(
    id: string
  ) {

    return prisma.deal.findUnique({

      where: {
        id,
      },

      include: {

        company: true,

        contact: true,

        stage: true,

        pipeline: true,

        tags: true,

        notes: true,

        tasks: true,

        activities: true,

      },

    });

  }

  async findByTitle(

    tenantId: string,

    title: string

  ) {

    return prisma.deal.findFirst({

      where: {

        tenantId,

        title,

      },

    });

  }

  async findAll(

    tenantId: string

  ) {

    return prisma.deal.findMany({

      where: {

        tenantId,

      },

      include: {

        company: true,

        contact: true,

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

    data: UpdateDealDto

  ) {

    return prisma.deal.update({

      where: {

        id,

      },

      data,

    });

  }

  async delete(

    id: string

  ) {

    return prisma.deal.update({

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