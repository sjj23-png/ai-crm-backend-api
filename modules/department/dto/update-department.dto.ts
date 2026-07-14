export interface UpdateDepartmentDto {
  name?: string;
  code?: string;
  description?: string;
  status?: "ACTIVE" | "INACTIVE" | "ARCHIVED";
}