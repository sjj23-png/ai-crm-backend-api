import { z } from "zod";


export const CreateActivitySchema = z.object({

  tenantId: z.string().cuid(),

  dealId: z.string().cuid().optional(),

  leadId: z.string().cuid().optional(),

  companyId: z.string().cuid().optional(),

  type: z.enum([
    "CREATED",
    "UPDATED",
    "DELETED",
    "STATUS_CHANGED",
    "STAGE_CHANGED",
    "OWNER_CHANGED",
    "COMMENT",
    "NOTE",
    "CALL",
    "EMAIL",
    "MEETING",
    "TASK_CREATED",
    "TASK_COMPLETED"
  ]),

  message: z
    .string()
    .trim()
    .min(2)
    .max(1000)

});

export type CreateActivityDto =
  z.infer<typeof CreateActivitySchema>;