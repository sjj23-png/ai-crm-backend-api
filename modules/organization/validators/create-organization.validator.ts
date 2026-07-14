import { z } from "zod";


export const createOrganizationSchema = z.object({
  body: z.object({
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

    description: z
      .string()
      .trim()
      .max(500)
      .optional(),
  }),
});

export type CreateOrganizationInput =
  z.infer<
    typeof createOrganizationSchema
  >;