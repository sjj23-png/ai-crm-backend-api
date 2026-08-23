import prisma from "../../../../database/prisma.service";

import {
  TaskPriority,
  TaskStatus
} from "@prisma/client";

import {
  CreateTaskDto
} from "../dto/create-task.dto";

import {
  UpdateTaskDto
} from "../dto/update-task.dto";

export class TaskRepository {

  async create(
    data: CreateTaskDto & {
      publicId: string;
      tenantId: string;
      status: TaskStatus;
      priority: TaskPriority;
    }
  ) {
    return prisma.task.create({
      data: {
        publicId: data.publicId,
        tenantId: data.tenantId,
        title: data.title,
        description: data.description,
        completed: data.status === TaskStatus.COMPLETED,
        priority: data.priority,
        dueDate: data.dueDate,
        companyId: data.companyId,
        dealId: data.dealId,
        stageId: data.stageId || "",
        assignedUserId: data.assignedTo,
      },
      include: {
        assignee: true,
        company: true,
        deal: true,
        taskTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async findById(
    id: string
  ) {
    return prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        assignee: true,
        company: true,
        deal: true,
        taskTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async findAll(
    tenantId: string
  ) {
    return prisma.task.findMany({
      where: {
        tenantId,
        deletedAt: null,
      },
      include: {
        assignee: true,
        company: true,
        deal: true,
        taskTags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        dueDate: "asc",
      },
    });
  }

  async update(

    id: string,

    data:
    UpdateTaskDto

  ) {

    return prisma.task.update({

      where: {

        id

      },

      data

    });

  }

  async delete(
    id: string
  ) {

    return prisma.task.update({

      where: {

        id

      },

      data: {

        deletedAt:
          new Date()

      }

    });

  }

}