export interface CreateRoleDto {
  tenantId: string;
  
  name: string;
  code: string;
  description?: string;
}