"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionController = void 0;
const role_permission_service_1 = require("../services/role-permission.service");
class RolePermissionController {
    service = new role_permission_service_1.RolePermissionService();
    assign = async (req, res) => {
        try {
            const result = await this.service.assignPermissions(req.body.roleId, req.body.permissionIds);
            return res.json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    };
    getPermissions = async (req, res) => {
        const result = await this.service.getPermissions(req.params.roleId);
        return res.json(result);
    };
    remove = async (req, res) => {
        const result = await this.service.removePermission(req.params.roleId, req.params.permissionId);
        return res.json(result);
    };
}
exports.RolePermissionController = RolePermissionController;
//# sourceMappingURL=role-permission.controller.js.map