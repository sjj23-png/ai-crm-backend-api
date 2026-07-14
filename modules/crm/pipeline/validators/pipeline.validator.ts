import { z } from "zod";


import {
  CreatePipelineSchema,
} from "../dto/create-pipeline.dto";

import {
  UpdatePipelineSchema,
} from "../dto/update-pipeline.dto";

export const createPipelineSchema =
  z.object({

    body:
      CreatePipelineSchema,

  });

export const updatePipelineSchema =
  z.object({

    body:
      UpdatePipelineSchema,

  });