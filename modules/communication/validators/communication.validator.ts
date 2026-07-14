import { z } from "zod";

import {
  CommunicationChannel,
  CommunicationDirection,
  CommunicationStatus,
} from "@prisma/client";

export const createCommunicationSchema = z.object({

  body: z.object({

    companyId: z.string().optional(),

    contactId: z.string().optional(),

    leadId: z.string().optional(),

    dealId: z.string().optional(),

    senderId: z.string().optional(),

    channel: z.nativeEnum(
      CommunicationChannel
    ),

    direction: z.nativeEnum(
      CommunicationDirection
    ),

    subject: z
      .string()
      .max(255)
      .optional(),

    message: z
      .string()
      .min(1)
      .max(5000),

    externalId: z
      .string()
      .optional(),

  }),

});

export const updateCommunicationSchema = z.object({

  body: z.object({

    subject: z
      .string()
      .max(255)
      .optional(),

    message: z
      .string()
      .max(5000)
      .optional(),

    status: z
      .nativeEnum(
        CommunicationStatus
      )
      .optional(),

    externalId: z
      .string()
      .optional(),

    sentAt: z
      .date()
      .optional(),

    deliveredAt: z
      .date()
      .optional(),

    readAt: z
      .date()
      .optional(),

  }),

});