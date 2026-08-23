import { z } from "zod";


export const CreateContactSchema = z.object({

  tenantId: z.string().optional(),

  companyId: z.string().cuid(),

  ownerId: z.string().cuid().optional(),

  teamId: z.string().cuid().optional(),

  firstName: z.string().trim().min(2).max(100),

  lastName: z.string().trim().max(100).optional(),

  email: z.string().email(),

  phone: z.string().optional(),

  designation: z.string().optional(),

  department: z.string().optional(),

  source: z.string().optional(),

  address: z.string().optional(),

  city: z.string().optional(),

  state: z.string().optional(),

  country: z.string().optional(),

  postalCode: z.string().optional(),

  notes: z.string().optional(),

});

export type CreateContactDto =
  z.infer<typeof CreateContactSchema>;