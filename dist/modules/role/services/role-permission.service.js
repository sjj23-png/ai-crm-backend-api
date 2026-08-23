"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionService = void 0;
const role_permission_repository_1 = require("../repositories/role-permission.repository");
class RolePermissionService {
    repository = new role_permission_repository_1.RolePermissionRepository();
    async assignPermissions(roleId, permissionIds) {
        return this.repository.assign(roleId, permissionIds);
    }
    async getPermissions(roleId) {
        return this.repository.getPermissions(roleId);
    }
    async removePermission(roleId, permissionId) {
        return this.repository.remove(roleId, permissionId);
    }
}
exports.RolePermissionService = RolePermissionService;
//# sourceMappingURL=role-permission.service.js.map