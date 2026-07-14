import { z } from "zod";


export const CreateDealSchema = z.object({

  tenantId: z.string().cuid(),

  title: z
    .string()
    .trim()
    .min(2)
    .max(200),

  value: z
    .number()
    .positive(),

  currency: z
    .string()
    .default("INR"),

  probability: z
    .number()
    .min(0)
    .max(100)
    .default(0),

  expectedCloseDate: z
    .coerce
    .date()
    .optional(),

  lostReason: z
    .string()
    .optional(),

  companyId: z
    .string()
    .cuid()
    .optional(),

  contactId: z
    .string()
    .cuid()
    .optional(),

  pipelineId: z
    .string()
    .cuid()
    .optional(),

  stageId: z
    .string()
    .cuid(),

});

export type CreateDealDto =
  z.infer<
    typeof CreateDealSchema
  >;