import prisma from "../../../../database/prisma.service";


import {
  StageStatus,
} from "@prisma/client";

import {
  CreateStageDto,
} from "../dto/create-stage.dto";

import {
  UpdateStageDto,
} from "../dto/update-stage.dto";

export class StageRepository {

  async create(

    data:
    CreateStageDto & {

      publicId: string;

      status: StageStatus;

    }

  ) {

    return prisma.stage.create({

      data,

      include: {

        pipeline: true,

      },

    });

  }

  async findById(
    id: string
  ) {

    return prisma.stage.findUnique({

      where: {

        id,

      },

      include: {

        pipeline: true,

        deals: true,

        leads: true,

      },

    });

  }

  async findByName(

    pipelineId: string,

    name: string

  ) {

    return prisma.stage.findFirst({

      where: {

        pipelineId,

        name,

      },

    });

  }

  async findPipelineStages(

    pipelineId: string

  ) {

    return prisma.stage.findMany({

      where: {

        pipelineId,

        deletedAt: null,

      },

      orderBy: {

        displayOrder:
          "asc",

      },

    });

  }

  async update(

    id: string,

    data:
    UpdateStageDto

  ) {

    return prisma.stage.update({

      where: {

        id,

      },

      data,

    });

  }

  async delete(

    id: string

  ) {

    return prisma.stage.update({

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