import { CreateTenantDto } from "../dto/create-tenant.dto";
import { TenantRepository } from "../repositories/tenant.repository";

export class TenantService {
  private readonly repository = new TenantRepository();

  async createTenant(data: CreateTenantDto) {
      const existingTenant = await this.repository.findByEmail(data.email);

    if (existingTenant) {
      throw new Error("Tenant already exists.");
    }

    return this.repository.create(data);
  
  }





  async update(
    id: string,
    data: CreateTenantDto
  ) {
    const tenant = await this.repository.findById(id);

    if (!tenant) {
      throw new Error("Tenant not found.");
    }

    if (
      data.code &&
      data.code !== tenant.code
    ) {
      const existing =
        await this.repository.findByEmail(
          data.email
        );

      if (existing) {
        throw new Error(
          "Tenant with this email already exists."
        );
      }
    }

    return this.repository.update(
      id,
      data
    );
  }

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id: string) {
    const tenant = await this.repository.findById(id);

    if (!tenant) {
      throw new Error("Tenant not found.");
    }

    return tenant;
  }

  async delete(id: string) {
    await this.repository.delete(id);

    return {
      message: "Tenant deleted successfully.",
    };
  }
}