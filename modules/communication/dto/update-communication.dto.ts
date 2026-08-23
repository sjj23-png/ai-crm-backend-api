import {
  CommunicationStatus,
} from "../enums/communication.enums";

export interface UpdateCommunicationDto {

  subject?: string;

  message?: string;

  status?: CommunicationStatus;

  externalId?: string;

  sentAt?: Date;

  deliveredAt?: Date;

  readAt?: Date;

}