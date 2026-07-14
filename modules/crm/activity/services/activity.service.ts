import {ActivityType} from "@prisma/client";

import { CreateActivityDto } from "../dto/create-activity.dto";
import { UpdateActivityDto } from "../dto/update-activity.dto";

import { ActivityRepository } from "../repositories/activity.repository";

export class ActivityService {

  private repository =
    new ActivityRepository();

  async create(
    dto: CreateActivityDto
  ) {

    return this.repository.create({

      ...dto,

      publicId:
        `ACT-${Date.now()}`,

      type:
        dto.type as ActivityType,

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

    const activity =
      await this.repository.findById(id);

    if (!activity) {

      throw new Error(
        "Activity not found."
      );

    }

    return activity;

  }

  async update(

    id: string,

    dto: UpdateActivityDto

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
        "Activity deleted successfully."

    };

  }

}