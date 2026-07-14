import {
  CommunicationChannel,
  CommunicationDirection,
  CommunicationStatus,
} from "@prisma/client";

export interface CommunicationFilters {

  companyId?: string;

  contactId?: string;

  leadId?: string;

  dealId?: string;

  senderId?: string;

  channel?: CommunicationChannel;

  direction?: CommunicationDirection;

  status?: CommunicationStatus;

}