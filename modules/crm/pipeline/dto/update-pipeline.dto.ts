import { z } from "zod";


import {
  CreatePipelineSchema,
} from "./create-pipeline.dto";

export const UpdatePipelineSchema =
  CreatePipelineSchema.partial();

export type UpdatePipelineDto =
  z.infer<
    typeof UpdatePipelineSchema
  >;