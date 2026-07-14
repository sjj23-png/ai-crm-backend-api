import { z } from "zod";


export const createDepartmentSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Department name is required")
      .max(100),

    code: z
      .string()
      .trim()
      .min(2, "Department code is required")
      .max(30),

    description: z
      .string()
      .trim()
      .max(500)
      .optional(),
  }),
});

export const updateDepartmentSchema = z.object({
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

    status: z
      .enum([
        "ACTIVE",
        "INACTIVE",
        "ARCHIVED",
      ])
      .optional(),
  }),
});