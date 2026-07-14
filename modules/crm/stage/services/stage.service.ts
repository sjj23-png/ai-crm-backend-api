


import {
  StageStatus,
} from "@prisma/client";

import { CreateStageDto } from "../dto/create-stage.dto";
import { UpdateStageDto } from "../dto/update-stage.dto";

import { StageRepository } from "../repositories/stage.repository";

export class StageService {

  private repository =
    new StageRepository();

  async create(
    dto: CreateStageDto
  ) {

    const exists =
      await this.repository.findByName(
        dto.pipelineId,
        dto.name
      );

    if (exists) {

      throw new Error(
        "Stage already exists."
      );

    }

    if (
      dto.isWonStage &&
      dto.isLostStage
    ) {

      throw new Error(
        "Stage cannot be both Won and Lost."
      );

    }

    return this.repository.create({

      ...dto,

      publicId:
        `STG-${Date.now()}`,

      status:
        StageStatus.ACTIVE,

    });

  }

  async getPipelineStages(
    pipelineId: string
  ) {

    return this.repository.findPipelineStages(
      pipelineId
    );

  }

  async getById(
    id: string
  ) {

    const stage =
      await this.repository.findById(id);

    if (!stage) {

      throw new Error(
        "Stage not found."
      );

    }

    return stage;

  }

  async update(
    id: string,
    dto: UpdateStageDto
  ) {

    await this.getById(id);

    if (
      dto.isWonStage &&
      dto.isLostStage
    ) {

      throw new Error(
        "Stage cannot be both Won and Lost."
      );

    }

    return this.repository.update(
      id,
      dto
    );

  }

  async delete(
    id: string
  ) {

    await this.getById(id);

    await this.repository.delete(id);

    return {

      message:
        "Stage deleted successfully."

    };

  }

}