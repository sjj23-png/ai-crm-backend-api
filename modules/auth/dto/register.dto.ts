import { z } from "zod";

export const RegisterSchema = z.object({
  name:z.string().min(4),
  email: z.string().email(),
  password: z.string().min(6),
  tenantId: z.string().min(1),
  roleId:z.string().min(1)
});

export type RegisterDto = z.infer<typeof RegisterSchema>;