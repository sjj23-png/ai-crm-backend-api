import { RolePermissionRepository } from "../repositories/role-permission.repository";

export class RolePermissionService {

  private repository =
    new RolePermissionRepository();

  async assignPermissions(
    roleId: string,
    permissionIds: string[]
  ) {

    return this.repository.assign(
      roleId,
      permissionIds
    );

  }

  async getPermissions(roleId: string) {

    return this.repository.getPermissions(roleId);

  }

  async removePermission(
    roleId: string,
    permissionId: string
  ) {

    return this.repository.remove(
      roleId,
      permissionId
    );

  }

}