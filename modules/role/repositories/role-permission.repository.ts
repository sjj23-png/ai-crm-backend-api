import prisma from "../../../database/prisma.service";

export class RolePermissionRepository {

  async assign(roleId: string, permissionIds: string[]) {

    await prisma.rolePermission.deleteMany({
      where: {
        roleId
      }
    });

    return prisma.rolePermission.createMany({
      data: permissionIds.map(permissionId => ({
        roleId,
        permissionId
      }))
    });

  }

  async getPermissions(roleId: string) {

    return prisma.rolePermission.findMany({

      where: {
        roleId
      },

      include: {
        permission: true
      }

    });

  }

  async remove(roleId: string, permissionId: string) {

    return prisma.rolePermission.delete({

      where: {
        roleId_permissionId: {
          roleId,
          permissionId
        }
      }

    });

  }

}