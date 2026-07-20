import { z } from "zod";

export const CreateTenantSchema = z.object({
  name: z.string().min(2).max(100),

  code: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/),

  email: z.string().email().optional(),

  phone: z.string().optional(),

  website: z.string().url().optional(),

  logo: z.string().url().optional()
});

export type CreateTenantDto = z.infer<typeof CreateTenantSchema>;