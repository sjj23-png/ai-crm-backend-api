import { z } from "zod";


export const CreateTagSchema = z.object({

  tenantId: z.string().cuid(),

  name: z.string()
    .min(2)
    .max(100),

  color: z.string().optional(),

  description: z.string().optional()

});

export type CreateTagDto =
z.infer<typeof CreateTagSchema>;