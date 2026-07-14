import { DepartmentRepository } from "../repositories/department.repository";
import { CreateDepartmentDto } from "../dto/create-department.dto";

export class DepartmentService{

  private repository =
  new DepartmentRepository();

  async create(data:CreateDepartmentDto){

    const exists =
    await this.repository.findByName(
      data.name,
      data.tenantId
    );

    if(exists){

      throw new Error(
        "Department already exists."
      );

    }

    return this.repository.create(data);

  }

  async getAll(tenantId:string){

    return this.repository.findAll(
      tenantId
    );

  }

  async getById(id:string){

    const department =
    await this.repository.findById(id);

    if(!department){

      throw new Error(
        "Department not found."
      );

    }

    return department;

  }

  async delete(id:string){

    await this.repository.delete(id);

    return{

      message:
      "Department deleted successfully."

    };

  }

}