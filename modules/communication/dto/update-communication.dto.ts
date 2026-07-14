import {
  CommunicationStatus,
} from "@prisma/client";

export interface UpdateCommunicationDto {

  subject?: string;

  message?: string;

  status?: CommunicationStatus;

  externalId?: string;

  sentAt?: Date;

  deliveredAt?: Date;

  readAt?: Date;

}