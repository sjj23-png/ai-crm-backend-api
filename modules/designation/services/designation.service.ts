import { CreateDesignationDto } from "../dto/create-designation.dto";
import { UpdateDesignationDto } from "../dto/update-designation.dto";

import { DesignationRepository } from "../repositories/designation.repository";

export class DesignationService {
  private repository =
    new DesignationRepository();

  async create(
    tenantId: string,
    dto: CreateDesignationDto
  ) {
    const existing =
      await this.repository.findByTenantAndName(
        tenantId,
        dto.name
      );

    if (existing) {
      throw new Error(
        "Designation already exists."
      );
    }

    return this.repository.create(
      tenantId,
      dto
    );
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
    const designation =
      await this.repository.findById(id);

    if (!designation) {
      throw new Error(
        "Designation not found."
      );
    }

    return designation;
  }

  async update(
    id: string,
    dto: UpdateDesignationDto
  ) {
    const designation =
      await this.repository.findById(id);

    if (!designation) {
      throw new Error(
        "Designation not found."
      );
    }

    if (
      dto.name &&
      dto.name !== designation.name
    ) {
      const exists =
        await this.repository.findByTenantAndName(
          designation.tenantId,
          dto.name
        );

      if (
        exists &&
        exists.id !== id
      ) {
        throw new Error(
          "Designation already exists."
        );
      }
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
        "Designation deleted successfully.",
    };
  }
}