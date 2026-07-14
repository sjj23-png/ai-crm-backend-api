import { OrganizationRepository } from "../repositories/organization.repository";
import { CreateOrganizationDto } from "../dto/create-organization.dto";

export class OrganizationService {

  private repository =
    new OrganizationRepository();

  async create(
    tenantId: string,
    data: CreateOrganizationDto
  ) {

    const existing =
      await this.repository.findByCode(
        tenantId,
        data.code
      );

    if (existing) {
      throw new Error(
        "Organization code already exists."
      );
    }

    return this.repository.create({
      tenantId,
      ...data,
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

    const organization =
      await this.repository.findById(id);

    if (!organization) {
      throw new Error(
        "Organization not found."
      );
    }

    return organization;

  }

  async update(
    id: string,
    data: {
      name?: string;
      code?: string;
      description?: string;
    }
  ) {

    const organization =
      await this.repository.findById(id);

    if (!organization) {
      throw new Error(
        "Organization not found."
      );
    }

    return this.repository.update(
      id,
      data
    );

  }

  async delete(
    id: string
  ) {

    await this.repository.delete(id);

    return {
      message:
        "Organization deleted successfully.",
    };

  }

}