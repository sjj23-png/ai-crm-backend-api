import {
  CommunicationChannel,
  CommunicationDirection,
} from "../enums/communication.enums";

export interface CreateCommunicationDto {
  companyId?: string;
  contactId?: string;
  leadId?: string;
  dealId?: string;

  senderId?: string;

  channel: CommunicationChannel;
  direction: CommunicationDirection;

  subject?: string;
  message: string;

  externalId?: string;
}