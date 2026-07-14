import { RoleStatus } from "@prisma/client";



export interface UpdateRoleDto {
  name?: string;
  
  code?: string;
  description?: string;
  status?: RoleStatus;
}