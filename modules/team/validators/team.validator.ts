import { z } from "zod";

export const createTeamSchema = z.object({

  body: z.object({

    departmentId: z
      .string()
      .min(1),

    name: z
      .string()
      .trim()
      .min(2)
      .max(100),

    description: z
      .string()
      .max(500)
      .optional(),

    leadId: z
      .string()
      .optional(),

  }),

});

export const updateTeamSchema = z.object({

  body: z.object({

    departmentId: z
      .string()
      .optional(),

    name: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    description: z
      .string()
      .max(500)
      .optional(),

    leadId: z
      .string()
      .optional(),

    status: z
      .string()
      .optional(),

  }),

});