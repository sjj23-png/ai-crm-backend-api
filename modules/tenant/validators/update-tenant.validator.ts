import { z } from "zod";


import {
  createTenantSchema,
} from "./create-tenant.validator";

export const updateTenantSchema =
  createTenantSchema.partial();

export type UpdateTenantInput =
  z.infer<
    typeof updateTenantSchema
  >;