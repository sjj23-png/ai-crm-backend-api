import { z } from "zod";

export const createNotificationSchema = z.object({

  body: z.object({

    userId: z
      .string()
      .min(1),

    title: z
      .string()
      .trim()
      .min(2)
      .max(255),

    message: z
      .string()
      .trim()
      .min(1)
      .max(5000),

    type: z
      .string()
      .trim()
      .min(1)
      .max(100),

    channel: z
      .string()
      .trim()
      .min(1)
      .max(100),

    status: z
      .string()
      .optional(),

  }),

});

export const updateNotificationSchema = z.object({

  body: z.object({

    title: z
      .string()
      .trim()
      .min(2)
      .max(255)
      .optional(),

    message: z
      .string()
      .trim()
      .max(5000)
      .optional(),

    type: z
      .string()
      .trim()
      .max(100)
      .optional(),

    channel: z
      .string()
      .trim()
      .max(100)
      .optional(),

    status: z
      .string()
      .optional(),

    readAt: z
      .coerce
      .date()
      .optional(),

  }),

});