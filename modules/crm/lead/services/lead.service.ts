


import {
  LeadStatus,
} from "@prisma/client";

import { CreateLeadDto } from "../dto/create-lead.dto";
import { UpdateLeadDto } from "../dto/update-lead.dto";

import { LeadRepository } from "../repositories/lead.repository";

export class LeadService {

  private repository =
    new LeadRepository();

  async create(
    dto: CreateLeadDto
  ) {

    const existing =
      await this.repository.findByEmail(
        dto.tenantId,
        dto.email
      );

    if (existing) {

      throw new Error(
        "Lead already exists."
      );

    }

    const publicId =
      `LED-${Date.now()}`;

    return this.repository.create({

      ...dto,

      publicId,

      status:
        LeadStatus.NEW,

      score: 0,

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

    const lead =
      await this.repository.findById(id);

    if (!lead) {

      throw new Error(
        "Lead not found."
      );

    }

    return lead;

  }

  async update(
    id: string,
    dto: UpdateLeadDto
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
        "Lead deleted successfully."

    };

  }

}