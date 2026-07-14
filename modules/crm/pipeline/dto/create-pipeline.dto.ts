import { z } from "zod";


export const CreatePipelineSchema = z.object({

  tenantId: z.string().cuid(),

  name: z
    .string()
    .trim()
    .min(2)
    .max(100),

  description: z
    .string()
    .optional(),

  isDefault: z
    .boolean()
    .optional(),

  displayOrder: z
    .number()
    .int()
    .min(0)
    .optional(),

});

export type CreatePipelineDto =
  z.infer<
    typeof CreatePipelineSchema
  >;