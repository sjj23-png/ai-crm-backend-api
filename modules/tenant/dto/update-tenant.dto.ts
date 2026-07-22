import { z } from "zod";
import { CreateTenantSchema } from "./create-tenant.dto";


export const UpdateTenantSchema = CreateTenantSchema.partial();

export type UpdateTenantDto = z.infer<typeof UpdateTenantSchema>;