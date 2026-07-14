import { CompanyRepository } from "../repositories/company.repository";
import { CreateCompanyDto } from "../dto/create-company.dto";

import { UpdateCompanyDto } from "../dto/update-company.dto";
export class CompanyService {

  private repository =
    new CompanyRepository();

  async create(

    data: CreateCompanyDto

  ) {

    const exists =
      await this.repository.findByName(

        data.tenantId,

        data.name

      );

    if (exists) {

      throw new Error(

        "Company already exists."

      );

    }

    return this.repository.create({

      ...data,

      publicId:
        await this.generatePublicId(),

      status: "ACTIVE"

    });

  }

  async generatePublicId() {

    const value =
      Date.now();

    return `CMP-${value}`;

  }

  async getAll(

    tenantId: string

  ) {

    return this.repository.findAll(

      tenantId

    );

  }

























  async update(
    id: string,
    data: UpdateCompanyDto
  ) {

    await this.getById(id);

    return this.repository.update(
      id,
      data
    );

  }

  async delete(id: string) {

    await this.getById(id);

    await this.repository.delete(id);

    return {

      message:
        "Company deleted successfully.",

    };

  }
  async getById(id: string) {

    const company =
      await this.repository.findById(id);

    if (!company) {

      throw new Error(

        "Company not found."

      );

    }

    return company;

  }

}