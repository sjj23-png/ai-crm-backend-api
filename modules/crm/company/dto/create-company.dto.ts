import { z } from "zod";


export const CreateCompanySchema = z.object({
  tenantId: z.string().optional(),

  teamId: z.string().optional().nullable().or(z.literal("")),

  ownerId: z.string().optional().nullable().or(z.literal("")),

  name: z.string()
    .min(2)
    .max(200),

  industry: z.string().optional().nullable().or(z.literal("")),

  website: z.string().optional().nullable().or(z.literal("")),

  email: z.string().optional().nullable().or(z.literal("")),

  phone: z.string().optional().nullable().or(z.literal("")),

  address: z.string().optional().nullable().or(z.literal("")),

  city: z.string().optional().nullable().or(z.literal("")),

  state: z.string().optional().nullable().or(z.literal("")),

  country: z.string().optional().nullable().or(z.literal("")),

  postalCode: z.string().optional().nullable().or(z.literal("")),

  companySize: z.string().optional().nullable().or(z.literal("")),

  description: z.string().optional().nullable().or(z.literal(""))
});

export type CreateCompanyDto =
z.infer<typeof CreateCompanySchema>;