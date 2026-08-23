"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = void 0;
const organization_service_1 = require("../services/organization.service");
const update_user_organization_dto_1 = require("../dto/update-user-organization.dto");
class OrganizationController {
    service = new organization_service_1.OrganizationService();
    assign = async (req, res) => {
        try {
            const data = update_user_organization_dto_1.UpdateUserOrganizationSchema.parse(req.body);
            const result = await this.service.assign(req.user.tenantId, req.params.userId, data);
            return res.json({
                success: true,
                message: "User organization settings updated successfully.",
                data: result,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    };
    hierarchy = async (req, res) => {
        try {
            const result = await this.service.getHierarchy(req.user.tenantId, req.params.userId);
            return res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    };
}
exports.OrganizationController = OrganizationController;
//# sourceMappingURL=organization.controller.js.map