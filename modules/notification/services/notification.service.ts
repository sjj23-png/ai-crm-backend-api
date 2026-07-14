import { CreateNotificationDto } from "../dto/create-notification.dto";
import { UpdateNotificationDto } from "../dto/update-notification.dto";

import { NotificationRepository } from "../repositories/notification.repository";
import { NotificationFilters } from "../types/notification.types";

export class NotificationService {

  private repository =
    new NotificationRepository();

  async create(
    tenantId: string,
    dto: CreateNotificationDto
  ) {

    return this.repository.create(
      tenantId,
      dto
    );

  }

  async getAll(
    tenantId: string,
    filters?: NotificationFilters
  ) {

    return this.repository.findAll(
      tenantId,
      filters
    );

  }

  async getById(
    id: string
  ) {

    const notification =
      await this.repository.findById(
        id
      );

    if (!notification) {
      throw new Error(
        "Notification not found."
      );
    }

    return notification;

  }

  async update(
    id: string,
    dto: UpdateNotificationDto
  ) {

    await this.getById(id);

    return this.repository.update(
      id,
      dto
    );

  }

  async markAsRead(
    id: string
  ) {

    await this.getById(id);

    return this.repository.markAsRead(
      id
    );

  }

  async delete(
    id: string
  ) {

    await this.getById(id);

    return this.repository.delete(
      id
    );

  }

}