import { z } from "zod";

export const CreateDealSchema = z.object({
  tenantId: z.string().optional(),
  ownerId: z.string().cuid().optional(),
  teamId: z.string().cuid().optional(),
  pipelineId: z.string().cuid().optional(),
  stageId: z.string().cuid().optional(),
  title: z.string().min(1).max(200),
  value: z.number().positive(),
  currency: z.string().default("INR"),
  description: z.string().optional(),
});

export type CreateDealDto = z.infer<typeof CreateDealSchema>;