import { z } from "zod";


import {
  CreateDealSchema,
} from "../dto/create-deal.dto";

import {
  UpdateDealSchema,
} from "../dto/update-deal.dto";

export const createDealSchema =
  z.object({

    body:
      CreateDealSchema,

  });

export const updateDealSchema =
  z.object({

    body:
      UpdateDealSchema,

  });