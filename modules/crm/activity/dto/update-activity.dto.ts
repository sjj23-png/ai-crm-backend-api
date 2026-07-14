import { z } from "zod";


import {
  CreateActivitySchema
} from "./create-activity.dto";

export const UpdateActivitySchema =
  CreateActivitySchema.partial();

export type UpdateActivityDto =
  z.infer<typeof UpdateActivitySchema>;