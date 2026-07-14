import { z } from "zod";


export const createTenantSchema =
  z.object({

    name: z
      .string()
      .trim()
      .min(2)
      .max(100),

    code: z
      .string()
      .trim()
      .min(2)
      .max(30),

    domain: z
      .string()
      .trim()
      .optional()

  });

export type CreateTenantInput =
  z.infer<
    typeof createTenantSchema
  >;