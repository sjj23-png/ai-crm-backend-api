export interface UpdateUserDto {

  
  name?: string;

  email?: string;

  roleId?: string;

  teamId?: string;

  designationId?: string;

  status?:
    | "ACTIVE"
    | "INACTIVE"
    | "SUSPENDED";

}