import prisma from "../../../database/prisma.service"
import type { Prisma, User } from "@prisma/client";

export class AuthRepository {
  /**
   * Find user by email with all authentication relations.
   */
  async findUserByEmail(email: string) {
    return prisma.user.findFirst({
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
  async createUser(data: {
    name:string;
    email:string;
    passwordHash:string;
    tenantId :string;
    roleId:string;
  }) {
    return prisma.user.create({
      data,
    });
  }

  /**
   * Create login session.
   */

  async createProfile(userId:string){

    return prisma.userProfile.create({
      data:{
        userId,
      }
    })
  }
  async createSession(data: {
    userId:string;
    token:string;
    expiresAt:Date;
    ipAdress?:string;
    userAgent?:string;
  }) {
    return prisma.session.create({
      data,
    });
  }

  /**
   * Find session by JWT token.
   */
  async findSession(token: string) {
    return prisma.session.findUnique({
      where: {
        token,
      },
    });
  }

  /**
   * Delete session (Logout).
   * Later we can replace this with revokeSession() if we implement soft logout.
   */
  async deleteSession(token: string) {
    return prisma.session.delete({
      where: {
        token,
      },
    });
  }
  async findUserById(id: string) {
    return prisma.user.findFirst({
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

async createRefreshToken(data: {
  userId: string;
  token: string;
  expiresAt: Date;
}) {
  return prisma.refreshToken.create({
    data,
  });
}

async findRefreshToken(token: string) {
  return prisma.refreshToken.findUnique({
    where: { token },
  });
}

  /**
   * Delete all sessions of a user.
   * Useful for "Logout from all devices".
   */
  async deleteUserSessions(userId: string) {
    return prisma.session.deleteMany({
      where: {
        userId,
      },
    });
  }

  /**
   * Revoke all active refresh tokens of a user.
   */
  async revokeUserRefreshTokens(userId: string) {
    return prisma.refreshToken.updateMany({
      where: {
        userId,
        revoked: false,
      },
      data: {
        revoked: true,
      },
    });
  }

  async findTenantByCode(code: string) {
    return prisma.tenant.findUnique({
      where: { code },
    });
  }

  async findTenantByEmail(email: string) {
    return prisma.tenant.findUnique({
      where: { email },
    });
  }

  async registerTenantAndOwner(data: {
    tenantName: string;
    tenantCode?: string;
    tenantEmail: string;
    tenantPhone?: string;
    tenantWebsite?: string;
    logo?: string;
    ownerName: string;
    ownerEmail: string;
    passwordHash: string;
  }) {
    return prisma.$transaction(async (tx) => {
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

/**
 * Singleton Repository
 */
export const authRepository = new AuthRepository();