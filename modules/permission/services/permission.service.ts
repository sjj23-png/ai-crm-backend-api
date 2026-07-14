import { CreatePermissionDto } from "../dto/create-permission.dto";
import { PermissionRepository } from "../repositories/permission.repository";

import { UpdatePermissionDto } from "../dto/update-permission.dto";
export class PermissionService {
  private readonly repository = new PermissionRepository();

  async create(data: CreatePermissionDto) {
    const exists = await this.repository.findByCode(data.tenantId,  data.code);

    if (exists) {
      throw new Error("Permission code already exists.");
    }

    return this.repository.create(data);
  }

  
  async getAll(tenantId:string) {
    return this.repository.findAll(tenantId);
  }

  async getById(id: string) {
    const permission = await this.repository.findById(id);

    if (!permission) {
      throw new Error("Permission not found.");
    }
    
    return permission;
  }

  async update(
  id: string,
  data: UpdatePermissionDto
) {

  const permission =
    await this.repository.findById(id);

  if (!permission) {
    throw new Error(
      "Permission not found."
    );
  }

  return this.repository.update(
    id,
    data
  );

}










  
  async delete(id: string) {
    await this.repository.delete(id);

    return {
      message: "Permission deleted successfully.",
    };
  }
}