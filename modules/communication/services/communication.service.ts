import { randomUUID } from "crypto";

import { CreateCommunicationDto } from "../dto/create-communication.dto";
import { UpdateCommunicationDto } from "../dto/update-communication.dto";
import { CommunicationFilters } from "../types/communication.types";
import { CommunicationRepository } from "../repositories/communication.repository";

export class CommunicationService {

  private repository =
    new CommunicationRepository();

  async create(
    tenantId: string,
    createdBy: string,
    dto: CreateCommunicationDto
  ) {

    const publicId =
      randomUUID();

    return this.repository.create(
      tenantId,
      publicId,
      createdBy,
      dto
    );

  }

  async getAll(
    tenantId: string,
    filters?: CommunicationFilters
  ) {

    return this.repository.findAll(
      tenantId,
      filters
    );

  }

  async getById(
    id: string
  ) {

    const communication =
      await this.repository.findById(id);

    if (!communication) {
      throw new Error(
        "Communication not found."
      );
    }

    return communication;

  }

  async getByPublicId(
    publicId: string
  ) {

    const communication =
      await this.repository.findByPublicId(
        publicId
      );

    if (!communication) {
      throw new Error(
        "Communication not found."
      );
    }

    return communication;

  }

  async update(
    id: string,
    updatedBy: string,
    dto: UpdateCommunicationDto
  ) {

    await this.getById(id);

    return this.repository.update(
      id,
      updatedBy,
      dto
    );

  }

  async markSent(
    id: string
  ) {

    await this.getById(id);

    return this.repository.markSent(
      id
    );

  }

  async markDelivered(
    id: string
  ) {

    await this.getById(id);

    return this.repository.markDelivered(
      id
    );

  }

  async markRead(
    id: string
  ) {

    await this.getById(id);

    return this.repository.markRead(
      id
    );

  }

  async delete(
    id: string,
    updatedBy: string
  ) {

    await this.getById(id);

    return this.repository.softDelete(
      id,
      updatedBy
    );

  }

}