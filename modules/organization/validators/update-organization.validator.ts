import { z } from "zod";


export const updateOrganizationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    code: z
      .string()
      .trim()
      .min(2)
      .max(30)
      .optional(),

    description: z
      .string()
      .trim()
      .max(500)
      .optional(),
  }),
});

export type UpdateOrganizationInput =
  z.infer<
    typeof updateOrganizationSchema
  >;