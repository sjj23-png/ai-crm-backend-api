import { z } from "zod";


import {
  CreateActivitySchema
} from "../dto/create-activity.dto";

import {
  UpdateActivitySchema
} from "../dto/update-activity.dto";

export const createActivitySchema =
  z.object({

    body:
      CreateActivitySchema

  });

export const updateActivitySchema =
  z.object({

    body:
      UpdateActivitySchema

  });