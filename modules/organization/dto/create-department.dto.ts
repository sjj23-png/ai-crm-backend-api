import { z } from "zod";

export const CreateDepartmentSchema = z.object({

  tenantId: z.string().cuid(),

  name: z.string().min(2).max(100),

  description: z.string().optional()

});

export type CreateDepartmentDto =
z.infer<typeof CreateDepartmentSchema>;