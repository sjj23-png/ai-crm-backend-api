import {
  TaskPriority,
  TaskStatus
} from "@prisma/client";

import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";

import { TaskRepository } from "../repositories/task.repository";

export class TaskService {

  private repository =
    new TaskRepository();

  async create(
    dto: CreateTaskDto
  ) {

    return this.repository.create({

      ...dto,

      publicId:
        `TSK-${Date.now()}`,

      status:
        dto.status
          ? dto.status as TaskStatus
          : TaskStatus.PENDING,

      priority:
        dto.priority
          ? dto.priority as TaskPriority
          : TaskPriority.MEDIUM

    });

  }

  async getAll(
    tenantId: string
  ) {

    return this.repository.findAll(
      tenantId
    );

  }

  async getById(
    id: string
  ) {

    const task =
      await this.repository.findById(id);

    if (!task) {

      throw new Error(
        "Task not found."
      );

    }

    return task;

  }

  async update(

    id: string,

    dto: UpdateTaskDto

  ) {

    await this.getById(id);

    return this.repository.update(

      id,

      dto

    );

  }

  async delete(
    id: string
  ) {

    await this.getById(id);

    await this.repository.delete(id);

    return {

      message:
        "Task deleted successfully."

    };

  }

}