import { CreateRoleDto } from "../dto/create-role.dto";
import { RoleRepository } from "../repositories/role.repository";

import { UpdateRoleDto } from "../dto/update-role.dto";
export class RoleService {
  private readonly repository = new RoleRepository();

  async create( tenantId: string,
    dto: CreateRoleDto) {
    const exists = await this.repository.findByName(
      dto.name,
      tenantId
    );

    if (exists) {
      throw new Error("Role already exists.");
    }

    return this.repository.create(dto);
  }

  async getAll(tenantId: string) {
    return this.repository.findAll(tenantId);
  }

  async getById(id: string) {
    const role = await this.repository.findById(id);

    if (!role) {
      throw new Error("Role not found.");
    }

    return role;
  }

  

  async delete(id: string) {
    await this.repository.delete(id);

    return {
      message: "Role deleted successfully.",
    };
  }








async update(
  id: string,
  dto: UpdateRoleDto
) {
  const role = await this.repository.findById(id);

  if (!role) {
    throw new Error("Role not found.");
  }

  if (dto.name) {
    const existingRole =
      await this.repository.findByName(
        dto.name,
        role.tenantId
      );

    if (
      existingRole &&
      existingRole.id !== id
    ) {
      throw new Error(
        "Role already exists."
      );
    }
  }

  return this.repository.update(
    id,
    dto
  );
}


}