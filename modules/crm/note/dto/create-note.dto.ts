import { z } from "zod";


export const CreateNoteSchema = z.object({

  tenantId: z.string().cuid(),

  companyId: z.string().cuid().optional(),

  leadId: z.string().cuid().optional(),

  dealId: z.string().cuid().optional(),

  title: z
    .string()
    .trim()
    .min(2)
    .max(200),

  content: z
    .string()
    .trim()
    .min(1)

});

export type CreateNoteDto =
  z.infer<typeof CreateNoteSchema>;