import { ContactRepository } from "../repositories/contact.repository";

import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";

import { CompanyRepository } from "../../company/repositories/company.repository";

export class ContactService {

  private repository =
    new ContactRepository();

  private companyRepository =
    new CompanyRepository();

  async create(
    data: CreateContactDto
  ) {

    const exists =
      await this.repository.findByEmail(

        data.tenantId,

        data.email

      );

    if (exists) {

      throw new Error(
        "Contact email already exists."
      );

    }

    const company =
      await this.companyRepository.findById(
        data.companyId
      );

    if (!company) {

      throw new Error(
        "Company not found."
      );

    }

    return this.repository.create({

      ...data,

      publicId:
        await this.generatePublicId(),

      status: "ACTIVE",

    });

  }

  async generatePublicId() {

    return `CNT-${Date.now()}`;

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

    const contact =
      await this.repository.findById(id);

    if (!contact) {

      throw new Error(
        "Contact not found."
      );

    }

    return contact;

  }

  async getCompanyContacts(
    companyId: string
  ) {

    return this.repository.findByCompany(
      companyId
    );

  }

  async update(
    id: string,
    data: UpdateContactDto
  ) {

    await this.getById(id);

    if (data.email) {

      const existing =
        await this.repository.findByEmail(
          data.tenantId!,
          data.email
        );

      if (
        existing &&
        existing.id !== id
      ) {

        throw new Error(
          "Contact email already exists."
        );

      }

    }

    return this.repository.update(
      id,
      data
    );

  }

  async delete(
    id: string
  ) {

    await this.getById(id);

    await this.repository.delete(id);

    return {

      message:
        "Contact deleted successfully.",

    };

  }

}