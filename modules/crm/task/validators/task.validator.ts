import { z } from "zod";


import {
  CreateTaskSchema
} from "../dto/create-task.dto";

import {
  UpdateTaskSchema
} from "../dto/update-task.dto";

export const createTaskSchema =
  z.object({

    body:
      CreateTaskSchema

  });

export const updateTaskSchema =
  z.object({

    body:
      UpdateTaskSchema

  });