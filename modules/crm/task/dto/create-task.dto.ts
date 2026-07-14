import { z } from "zod";


export const CreateTaskSchema = z.object({

  tenantId: z.string().cuid(),

  companyId: z.string().cuid().optional(),

  dealId: z.string().cuid().optional(),

  assignedTo: z.string().cuid().optional(),

  title: z
    .string()
    .trim()
    .min(2)
    .max(200),

  description: z
    .string()
    .optional(),

  status: z
    .enum([
      "PENDING",
      "IN_PROGRESS",
      "COMPLETED",
      "CANCELLED"
    ])
    .optional(),

  priority: z
    .enum([
      "LOW",
      "MEDIUM",
      "HIGH",
      "URGENT"
    ])
    .optional(),

  dueDate: z
    .coerce
    .date()
    .optional()

});

export type CreateTaskDto =
  z.infer<typeof CreateTaskSchema>;