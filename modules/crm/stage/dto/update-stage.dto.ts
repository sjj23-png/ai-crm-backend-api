import { z } from "zod";


import {
  CreateStageSchema,
} from "./create-stage.dto";

export const UpdateStageSchema =
  CreateStageSchema.partial();

export type UpdateStageDto =
  z.infer<
    typeof UpdateStageSchema
  >;