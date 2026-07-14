import { z } from "zod";

export const createDesignationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name cannot exceed 100 characters."),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional(),
  }),
});

export type CreateDesignationInput =
  z.infer<typeof createDesignationSchema>;