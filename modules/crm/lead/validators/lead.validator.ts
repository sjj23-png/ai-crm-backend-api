import { z } from "zod";

import {
  CreateLeadSchema,
} from "../dto/create-lead.dto";

import {
  UpdateLeadSchema,
} from "../dto/update-lead.dto";

export const createLeadSchema =
  z.object({

    body:
      CreateLeadSchema,

  });

export const updateLeadSchema =
  z.object({

    body:
      UpdateLeadSchema,

  });