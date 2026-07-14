import { z } from "zod";


export const CreateStageSchema = z.object({

  tenantId: z.string().cuid(),

  pipelineId: z.string().cuid(),

  name: z
    .string()
    .trim()
    .min(2)
    .max(100),

  description: z
    .string()
    .optional(),

  displayOrder: z
    .number()
    .int()
    .min(0)
    .optional(),

  probability: z
    .number()
    .int()
    .min(0)
    .max(100)
    .optional(),

  color: z
    .string()
    .optional(),

  isWonStage: z
    .boolean()
    .optional(),

  isLostStage: z
    .boolean()
    .optional(),

});

export type CreateStageDto =
  z.infer<
    typeof CreateStageSchema
  >;