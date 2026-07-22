import { z } from "zod";


export const CreateTenantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Organization name is required")
    .max(150, "Organization name is too long"),

  code: z
    .string()
    .trim()
    .min(2, "Code must contain at least 2 characters")
    .max(50, "Code is too long")
    .regex(/^[A-Za-z0-9_-]+$/, "Invalid organization code")
    .optional(),

  email: z
    .string()
    .trim()
    .email("Invalid organization email"),

  phone: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .optional(),

  website: z
    .string()
    .trim()
    .url("Invalid website URL")
    .optional(),

  logo: z
    .string()
    .trim()
    .url("Invalid logo URL")
    .optional()
});

export type CreateTenantDto = z.infer<typeof CreateTenantSchema>;