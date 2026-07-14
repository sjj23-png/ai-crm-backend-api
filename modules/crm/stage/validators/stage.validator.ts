import { z } from "zod";


import {
  CreateStageSchema,
} from "../dto/create-stage.dto";

import {
  UpdateStageSchema,
} from "../dto/update-stage.dto";

export const createStageSchema =
  z.object({

    body:
      CreateStageSchema,

  });

export const updateStageSchema =
  z.object({

    body:
      UpdateStageSchema,

  });