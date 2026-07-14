import { CreateDepartmentDto } from "../dto/create-department.dto";
import { UpdateDepartmentDto } from "../dto/update-department.dto";
import { DepartmentRepository } from "../repositories/department.repository";

export class DepartmentService {

  private repository = new DepartmentRepository();

  async create(
    tenantId: string,
    dto: CreateDepartmentDto
  ) {

    const existingCode =
      await this.repository.findByCode(
        tenantId,
        dto.code
      );

    if (existingCode) {
      throw new Error(
        "Department code already exists."
      );
    }

    const existingName =
      await this.repository.findByName(
        tenantId,
        dto.name
      );

    if (existingName) {
      throw new Error(
        "Department name already exists."
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

  async getById(id: string) {

    const department =
      await this.repository.findById(id);

    if (!department) {
      throw new Error(
        "Department not found."
      );
    }

    return department;

  }

  async update(
    id: string,
    dto: UpdateDepartmentDto
  ) {

    await this.getById(id);

    return this.repository.update(
      id,
      dto
    );

  }

  async delete(id: string) {

    await this.getById(id);

    return this.repository.delete(id);

  }

}