import { DealStatus } from "@prisma/client";

import { CreateDealDto } from "../dto/create-deal.dto";
import { UpdateDealDto } from "../dto/update-deal.dto";

import { DealRepository } from "../repositories/deal.repository";

export class DealService {

  private repository =
    new DealRepository();

  async create(
    dto: CreateDealDto
  ) {
    if (!dto.tenantId || !dto.stageId) {
      throw new Error("Tenant ID and Stage ID are required.");
    }

    const existing = await this.repository.findByTitle(
      dto.tenantId,
      dto.title
    );

    if (existing) {
      throw new Error("Deal already exists.");
    }

    const publicId = `DEAL-${Date.now()}`;

    return this.repository.create({
      ...dto,
      tenantId: dto.tenantId,
      pipelineId: dto.pipelineId,
      stageId: dto.stageId,
      publicId,
      status: DealStatus.OPEN,
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

    const deal =
      await this.repository.findById(
        id
      );

    if (!deal) {

      throw new Error(
        "Deal not found."
      );

    }

    return deal;

  }

  async update(
    id: string,
    dto: UpdateDealDto
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
        "Deal deleted successfully."

    };

  }

}