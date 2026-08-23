"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepository = exports.AuthRepository = void 0;
const prisma_service_1 = __importDefault(require("../../../database/prisma.service"));
class AuthRepository {
    /**
     * Find user by email with all authentication relations.
     */
    async findUserByEmail(email) {
        return prisma_service_1.default.user.findFirst({
            where: { email },
            select: {
                id: true,
                tenantId: true,
                roleId: true,
                name: true,
                email: true,
                passwordHash: true,
                status: true,
                tenant: true,
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
                profile: true,
            },
        });
    }
    /**
     * Find user by ID.
     */
    /**
     * Create new user.
     * Business defaults (status, role, etc.) are decided by the service layer.
     */
    async createUser(data) {
        return prisma_service_1.default.user.create({
            data,
        });
    }
    /**
     * Create login session.
     */
    async createProfile(userId) {
        return prisma_service_1.default.userProfile.create({
            data: {
                userId,
            }
        });
    }
    async createSession(data) {
        return prisma_service_1.default.session.create({
            data,
        });
    }
    /**
     * Find session by JWT token.
     */
    async findSession(token) {
        return prisma_service_1.default.session.findUnique({
            where: {
                token,
            },
        });
    }
    /**
     * Delete session (Logout).
     * Later we can replace this with revokeSession() if we implement soft logout.
     */
    async deleteSession(token) {
        return prisma_service_1.default.session.delete({
            where: {
                token,
            },
        });
    }
    async findUserById(id) {
        return prisma_service_1.default.user.findFirst({
            where: { id },
            select: {
                id: true,
                tenantId: true,
                roleId: true,
                name: true,
                email: true,
                status: true,
                tenant: true,
                role: true,
                profile: true,
            },
        });
    }
    async createRefreshToken(data) {
        return prisma_service_1.default.refreshToken.create({
            data,
        });
    }
    async findRefreshToken(token) {
        return prisma_service_1.default.refreshToken.findUnique({
            where: { token },
        });
    }
    /**
     * Delete all sessions of a user.
     * Useful for "Logout from all devices".
     */
    async deleteUserSessions(userId) {
        return prisma_service_1.default.session.deleteMany({
            where: {
                userId,
            },
        });
    }
    /**
     * Revoke all active refresh tokens of a user.
     */
    async revokeUserRefreshTokens(userId) {
        return prisma_service_1.default.refreshToken.updateMany({
            where: {
                userId,
                revoked: false,
            },
            data: {
                revoked: true,
            },
        });
    }
    async findTenantByCode(code) {
        return prisma_service_1.default.tenant.findUnique({
            where: { code },
        });
    }
    async findTenantByEmail(email) {
        return prisma_service_1.default.tenant.findUnique({
            where: { email },
        });
    }
    async registerTenantAndOwner(data) {
        return prisma_service_1.default.$transaction(async (tx) => {
            const tenantCode = data.tenantCode || data.tenantName.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase() + Date.now().toString().slice(-4);
            const tenant = await tx.tenant.create({
                data: {
                    name: data.tenantName,
                    code: tenantCode,
                    email: data.tenantEmail,
                    phone: data.tenantPhone || null,
                    website: data.tenantWebsite || null,
                    logo: data.logo || null,
                },
            });
            const adminRole = await tx.role.create({
                data: {
                    tenantId: tenant.id,
                    name: "Administrator",
                    code: "ADMIN",
                    description: "Tenant Owner and Administrator",
                },
            });
            const user = await tx.user.create({
                data: {
                    tenantId: tenant.id,
                    roleId: adminRole.id,
                    name: data.ownerName,
                    email: data.ownerEmail,
                    passwordHash: data.passwordHash,
                    status: "ACTIVE",
                },
                select: {
                    id: true,
                    tenantId: true,
                    roleId: true,
                    name: true,
                    email: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            await tx.userProfile.create({
                data: {
                    userId: user.id,
                },
            });
            return { tenant, user };
        });
    }
}
exports.AuthRepository = AuthRepository;
/**
 * Singleton Repository
 */
exports.authRepository = new AuthRepository();
//# sourceMappingURL=auth.repository.js.map