import {
  CommunicationChannel,
  CommunicationDirection,
  CommunicationStatus,
} from "../enums/communication.enums";

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