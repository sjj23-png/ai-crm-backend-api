import { z } from "zod";


export const CreateTeamSchema = z.object({

  tenantId: z.string().cuid(),

  departmentId: z.string().cuid(),

  name: z.string().min(2).max(100),

  description: z.string().optional(),

  leadId: z.string().cuid().optional()

});

export type CreateTeamDto =
z.infer<typeof CreateTeamSchema>;