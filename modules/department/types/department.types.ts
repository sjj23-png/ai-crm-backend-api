export type DepartmentStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "ARCHIVED";

export interface DepartmentFilters {
  search?: string;
  status?: DepartmentStatus;
}