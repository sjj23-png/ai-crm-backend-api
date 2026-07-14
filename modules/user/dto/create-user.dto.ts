import { z } from "zod";

export const CreateUserSchema = z.object({

  name: z.string().min(2).max(100),

  email: z.string().email(),

  password: z.string().min(6),

  tenantId: z.string().cuid(),

  roleId: z.string().cuid(),

  teamId: z.string().cuid().optional(),

  designationId: z.string().cuid().optional(),

});

export type CreateUserDto =
  z.infer<typeof CreateUserSchema>;