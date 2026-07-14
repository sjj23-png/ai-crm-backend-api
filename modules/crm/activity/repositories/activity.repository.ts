import prisma from "../../../../database/prisma.service";

import {
  ActivityType
} from "@prisma/client";

import {
  CreateActivityDto
} from "../dto/create-activity.dto";

import {
  UpdateActivityDto
} from "../dto/update-activity.dto";

export class ActivityRepository {

  async create(

    data:
    CreateActivityDto & {

      publicId: string;

      type: ActivityType;

      createdBy?: string;

    }

  ) {

    return prisma.activity.create({

      data,

      include: {

        company: true,

        lead: true,

        deal: true

      }

    });

  }

  async findById(

    id: string

  ) {

    return prisma.activity.findUnique({

      where: {

        id

      },

      include: {

        company: true,

        lead: true,

        deal: true

      }

    });

  }

  async findAll(

    tenantId: string

  ) {

    return prisma.activity.findMany({

      where: {

        tenantId,

        deletedAt: null

      },

      include: {

        company: true,

        lead: true,

        deal: true

      },

      orderBy: {

        createdAt: "desc"

      }

    });

  }

  async update(

    id: string,

    data:
    UpdateActivityDto

  ) {

    return prisma.activity.update({

      where: {

        id

      },

      data

    });

  }

  async delete(

    id: string

  ) {

    return prisma.activity.update({

      where: {

        id

      },

      data: {

        deletedAt:
          new Date()

      }

    });

  }

}