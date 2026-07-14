import { z } from "zod";


export const updateDesignationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    description: z
      .string()
      .trim()
      .max(500)
      .optional(),

    status: z
      .enum([
        "ACTIVE",
        "INACTIVE",
      ])
      .optional(),
  }),
});

export type UpdateDesignationInput =
  z.infer<typeof updateDesignationSchema>;