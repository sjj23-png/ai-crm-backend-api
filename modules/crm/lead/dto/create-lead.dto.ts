import { z } from "zod";

export const CreateLeadSchema = z.object({

  tenantId: z.string().optional(),

  ownerId: z.string().cuid().optional(),

  teamId: z.string().cuid().optional(),

  companyId: z.string().cuid().optional(),

  contactId: z.string().cuid().optional(),

  pipelineId: z.string().cuid().optional(),

  stageId: z.string().cuid().optional(),

  firstName: z
    .string()
    .trim()
    .min(2)
    .max(100),

  lastName: z
    .string()
    .trim()
    .max(100)
    .optional(),

  email: z
    .string()
    .email(),

  phone: z
    .string()
    .optional(),

  source: z.enum([
    "WEBSITE",
    "REFERRAL",
    "LINKEDIN",
    "FACEBOOK",
    "GOOGLE_ADS",
    "COLD_CALL",
    "EMAIL_CAMPAIGN",
    "IMPORT",
    "API",
    "MANUAL",
    "OTHER"
  ]),

  estimatedValue: z
    .number()
    .positive()
    .optional(),

  expectedCloseDate: z
    .coerce
    .date()
    .optional(),

});

export type CreateLeadDto =
  z.infer<
    typeof CreateLeadSchema
  >;