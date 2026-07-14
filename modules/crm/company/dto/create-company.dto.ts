import { z } from "zod";


export const CreateCompanySchema = z.object({

  tenantId: z.string().cuid(),

  teamId: z.string().cuid(),

  ownerId: z.string().cuid(),

  name: z.string()
    .min(2)
    .max(200),

  industry: z.string().optional(),

  website: z.string().url().optional(),

  email: z.string().email().optional(),

  phone: z.string().optional(),

  address: z.string().optional(),

  city: z.string().optional(),

  state: z.string().optional(),

  country: z.string().optional(),

  postalCode: z.string().optional(),

  companySize: z.enum([
    "MICRO",
    "SMALL",
    "MEDIUM",
    "ENTERPRISE"
  ]),

  description: z.string().optional()

});

export type CreateCompanyDto =
z.infer<typeof CreateCompanySchema>;