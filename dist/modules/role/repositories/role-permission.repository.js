"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class RolePermissionRepository {
    async assign(roleId, permissionIds) {
        await prisma_service_1.default.rolePermission.deleteMany({
            where: {
                roleId
            }
        });
        return prisma_service_1.default.rolePermission.createMany({
            data: permissionIds.map(permissionId => ({
                roleId,
                permissionId
            }))
        });
    }
    async getPermissions(roleId) {
        return prisma_service_1.default.rolePermission.findMany({
            where: {
                roleId
            },
            include: {
                permission: true
            }
        });
    }
    async remove(roleId, permissionId) {
        return prisma_service_1.default.rolePermission.delete({
            where: {
                roleId_permissionId: {
                    roleId,
                    permissionId
                }
            }
        });
    }
}
exports.RolePermissionRepository = RolePermissionRepository;
//# sourceMappingURL=role-permission.repository.js.map