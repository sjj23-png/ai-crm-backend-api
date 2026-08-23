import prisma from "../../../database/prisma.service";

import { CreateCommunicationDto } from "../dto/create-communication.dto";
import { UpdateCommunicationDto } from "../dto/update-communication.dto";
import { CommunicationFilters } from "../types/communication.types";

export class CommunicationRepository {

  async create(
    tenantId: string,
    publicId: string,
    createdBy: string,
    data: CreateCommunicationDto
  ) {
    return prisma.communication.create({
      data: {
        tenantId,
        publicId,
        createdBy,
        ...data,
      } as any,
    });
  }

  async findById(id: string) {
    return prisma.communication.findUnique({
      where: {
        id,
      },
      include: {
        sender: true,
        company: true,
        contact: true,
        lead: true,
        deal: true,
      },
    });
  }

  async findByPublicId(publicId: string) {
    return prisma.communication.findUnique({
      where: {
        publicId,
      },
      include: {
        sender: true,
        company: true,
        contact: true,
        lead: true,
        deal: true,
      },
    });
  }

  async findAll(
    tenantId: string,
    filters?: CommunicationFilters
  ) {
    return prisma.communication.findMany({
      where: {
        tenantId,
        ...(filters?.companyId && {
          companyId: filters.companyId,
        }),
        ...(filters?.contactId && {
          contactId: filters.contactId,
        }),
        ...(filters?.leadId && {
          leadId: filters.leadId,
        }),
        ...(filters?.dealId && {
          dealId: filters.dealId,
        }),
        ...(filters?.senderId && {
          senderId: filters.senderId,
        }),
        ...(filters?.channel && {
          channel: filters.channel as any,
        }),
        ...(filters?.direction && {
          direction: filters.direction as any,
        }),
        ...(filters?.status && {
          status: filters.status as any,
        }),
        deletedAt: null,
      } as any,
      include: {
        sender: true,
        company: true,
        contact: true,
        lead: true,
        deal: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(
    id: string,
    updatedBy: string,
    data: UpdateCommunicationDto
  ) {
    return prisma.communication.update({
      where: {
        id,
      },
      data: {
        updatedBy,
        ...data,
      } as any,
    });
  }

  async markSent(id: string) {
    return prisma.communication.update({
      where: {
        id,
      },
      data: {
        status: "SENT",
        sentAt: new Date(),
      } as any,
    });
  }

  async markDelivered(id: string) {
    return prisma.communication.update({
      where: {
        id,
      },
      data: {
        status: "DELIVERED",
        deliveredAt: new Date(),
      } as any,
    });
  }

  async markRead(id: string) {
    return prisma.communication.update({
      where: {
        id,
      },
      data: {
        status: "READ",
        readAt: new Date(),
      } as any,
    });
  }

  async softDelete(
    id: string,
    updatedBy: string
  ) {
    return prisma.communication.update({
      where: {
        id,
      },
      data: {
        updatedBy,
        deletedAt: new Date(),
      } as any,
    });
  }
}