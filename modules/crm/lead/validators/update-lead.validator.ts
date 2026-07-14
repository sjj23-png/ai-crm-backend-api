import { z } from "zod";
import { createLeadSchema } from "./lead.validator";


export const updateLeadSchema =
  createLeadSchema.partial();

export type UpdateLeadInput = z.infer<
  typeof updateLeadSchema
>;