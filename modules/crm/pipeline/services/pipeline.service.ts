


import {
  PipelineStatus,
} from "@prisma/client";

import { CreatePipelineDto } from "../dto/create-pipeline.dto";
import { UpdatePipelineDto } from "../dto/update-pipeline.dto";

import { PipelineRepository } from "../repositories/pipeline.repository";

export class PipelineService {

  private repository =
    new PipelineRepository();

  async create(
    dto: CreatePipelineDto
  ) {

    const exists =
      await this.repository.findByName(
        dto.tenantId,
        dto.name
      );

    if (exists) {

      throw new Error(
        "Pipeline already exists."
      );

    }

    return this.repository.create({

      ...dto,

      publicId:
        `PLN-${Date.now()}`,

      status:
        PipelineStatus.ACTIVE,

    });

  }

  async getAll(
    tenantId: string
  ) {

    return this.repository.findAll(
      tenantId
    );

  }

  async getById(
    id: string
  ) {

    const pipeline =
      await this.repository.findById(
        id
      );

    if (!pipeline) {

      throw new Error(
        "Pipeline not found."
      );

    }

    return pipeline;

  }

  async update(
    id: string,
    dto: UpdatePipelineDto
  ) {

    await this.getById(id);

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
        "Pipeline deleted successfully.",

    };

  }

}