import prisma from "../../../../database/prisma.service";


import {
  PipelineStatus,
} from "@prisma/client";

import {
  CreatePipelineDto,
} from "../dto/create-pipeline.dto";

import {
  UpdatePipelineDto,
} from "../dto/update-pipeline.dto";

export class PipelineRepository {

  async create(

    data:
    CreatePipelineDto & {

      publicId: string;

      status: PipelineStatus;

    }

  ) {

    return prisma.pipeline.create({

      data,

      include: {

        stages: true,

      },

    });

  }

  async findById(
    id: string
  ) {

    return prisma.pipeline.findUnique({

      where: {

        id,

      },

      include: {

        stages: {

          orderBy: {

            displayOrder:
              "asc",

          },

        },

      },

    });

  }

  async findByName(

    tenantId: string,

    name: string

  ) {

    return prisma.pipeline.findFirst({

      where: {

        tenantId,

        name,

      },

    });

  }

  async findAll(

    tenantId: string

  ) {

    return prisma.pipeline.findMany({

      where: {

        tenantId,

        deletedAt: null,

      },

      include: {

        stages: {

          orderBy: {

            displayOrder:
              "asc",

          },

        },

      },

      orderBy: [

        {

          displayOrder:
            "asc",

        },

        {

          createdAt:
            "asc",

        },

      ],

    });

  }

  async update(

    id: string,

    data:
    UpdatePipelineDto

  ) {

    return prisma.pipeline.update({

      where: {

        id,

      },

      data,

    });

  }

  async delete(
    id: string
  ) {

    return prisma.pipeline.update({

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