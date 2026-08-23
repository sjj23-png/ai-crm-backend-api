"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class OrganizationRepository {
    async assignUserOrganization(userId, data) {
        return prisma_service_1.default.user.update({
            where: { id: userId },
            data: {
                departmentId: data.departmentId,
                teamId: data.teamId,
                designationId: data.designationId,
                managerId: data.managerId || null,
            },
        });
    }
    async findUserById(userId) {
        return prisma_service_1.default.user.findUnique({
            where: { id: userId },
            include: {
                tenant: true,
                role: true,
                profile: true,
            },
        });
    }
    async getUserHierarchy(userId) {
        const user = await prisma_service_1.default.user.findUnique({
            where: { id: userId },
            include: {
                designation: true,
                team: true,
                department: true,
                manager: {
                    include: {
                        designation: true,
                    },
                },
            },
        });
        if (!user) {
            throw new Error("User not found.");
        }
        const reportingLine = [];
        let currentManager = user.manager;
        while (currentManager) {
            reportingLine.push({
                id: currentManager.id,
                name: currentManager.name,
                email: currentManager.email,
                designation: currentManager.designation,
            });
            if (reportingLine.length > 10 || currentManager.managerId === currentManager.id) {
                break;
            }
            if (currentManager.managerId) {
                currentManager = await prisma_service_1.default.user.findUnique({
                    where: { id: currentManager.managerId },
                    include: {
                        designation: true,
                        manager: {
                            include: {
                                designation: true,
                            },
                        },
                    },
                });
            }
            else {
                currentManager = null;
            }
        }
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                designation: user.designation,
                team: user.team,
                department: user.department,
            },
            reportingLine,
        };
    }
}
exports.OrganizationRepository = OrganizationRepository;
//# sourceMappingURL=organization.repository.js.map