"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const organization_repository_1 = require("../repositories/organization.repository");
class OrganizationService {
    repository = new organization_repository_1.OrganizationRepository();
    async assign(tenantId, userId, data) {
        const user = await this.repository.findUserById(userId);
        if (!user) {
            throw new Error("User not found.");
        }
        if (user.tenantId !== tenantId) {
            throw new Error("Unauthorized access to user of another tenant.");
        }
        if (data.managerId) {
            const manager = await this.repository.findUserById(data.managerId);
            if (!manager) {
                throw new Error("Manager user not found.");
            }
            if (manager.tenantId !== tenantId) {
                throw new Error("Manager must belong to the same organization/tenant.");
            }
            if (userId === data.managerId) {
                throw new Error("A user cannot report to themselves.");
            }
        }
        return this.repository.assignUserOrganization(userId, data);
    }
    async getHierarchy(tenantId, userId) {
        const user = await this.repository.findUserById(userId);
        if (!user) {
            throw new Error("User not found.");
        }
        if (user.tenantId !== tenantId) {
            throw new Error("Unauthorized access to user hierarchy of another tenant.");
        }
        return this.repository.getUserHierarchy(userId);
    }
}
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=organization.service.js.map