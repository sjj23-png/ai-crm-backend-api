export interface CreatePermissionDto {
  tenantId: string;
  
  name: string;
  code: string;
  description?: string;
}