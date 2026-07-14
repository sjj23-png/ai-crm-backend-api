import prisma from "../../../database/prisma.service"
import type { Prisma, User } from "@prisma/client";

export class AuthRepository {
  /**
   * Find user by email with all authentication relations.
   */
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        tenant: true,
        role: {
          include: {
            permissions: {
              include:

              {
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
  return prisma.user.findUnique({
    where: { id },
    include: {
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
}

/**
 * Singleton Repository
 */
export const authRepository = new AuthRepository();