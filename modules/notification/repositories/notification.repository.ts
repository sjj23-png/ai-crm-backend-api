import prisma from "../../../database/prisma.service";

import { CreateNotificationDto } from "../dto/create-notification.dto";
import { UpdateNotificationDto } from "../dto/update-notification.dto";
import { NotificationFilters } from "../types/notification.types";

export class NotificationRepository {

  async create(
    tenantId: string,
    data: CreateNotificationDto
  ) {

    return prisma.notification.create({

      data: {
        tenantId,
        status: data.status ?? "PENDING",
        ...data,
      },

    });

  }

  async findById(
    id: string
  ) {

    return prisma.notification.findUnique({

      where: {
        id,
      },

      include: {
        user: true,
      },

    });

  }

  async findAll(
    tenantId: string,
    filters?: NotificationFilters
  ) {

    return prisma.notification.findMany({

      where: {

        tenantId,

        ...(filters?.userId && {
          userId: filters.userId,
        }),

        ...(filters?.type && {
          type: filters.type,
        }),

        ...(filters?.channel && {
          channel: filters.channel,
        }),

        ...(filters?.status && {
          status: filters.status,
        }),

      },

      include: {
        user: true,
      },

      orderBy: {
        createdAt: "desc",
      },

    });

  }

  async update(
    id: string,
    data: UpdateNotificationDto
  ) {

    return prisma.notification.update({

      where: {
        id,
      },

      data,

    });

  }

  async markAsRead(
    id: string
  ) {

    return prisma.notification.update({

      where: {
        id,
      },

      data: {
        status: "READ",
        readAt: new Date(),
      },

    });

  }

  async delete(
    id: string
  ) {

    return prisma.notification.delete({

      where: {
        id,
      },

    });

  }

}