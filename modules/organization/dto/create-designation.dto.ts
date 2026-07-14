import { z } from "zod";


export const CreateDesignationSchema = z.object({

  tenantId: z.string().cuid(),

  name: z.string()
    .min(2)
    .max(100),

  description: z.string().optional()

});

export type CreateDesignationDto =
z.infer<typeof CreateDesignationSchema>;