export interface CreateTeamDto {
  departmentId?: string;

  name: string;

  description?: string;

  leadId?: string;
}