import prisma from "../../../database/prisma.service";
import { UpdateUserOrganizationDto } from "../dto/update-user-organization.dto";

export class OrganizationRepository {
  async assignUserOrganization(
    userId: string,
    data: UpdateUserOrganizationDto
  ) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        departmentId: data.departmentId,
        teamId: data.teamId,
        designationId: data.designationId,
        managerId: data.managerId || null,
      },
    });
  }

  async findUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        tenant: true,
        role: true,
        profile: true,
      },
    });
  }

  async getUserHierarchy(userId: string) {
    const user = await prisma.user.findUnique({
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
        currentManager = await prisma.user.findUnique({
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
      } else {
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