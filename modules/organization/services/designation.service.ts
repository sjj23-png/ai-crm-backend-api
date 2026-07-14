import { CreateDesignationDto } from "../dto/create-designation.dto";
import { DesignationRepository } from "../repositories/designation.repository";

export class DesignationService{

  private repository =
  new DesignationRepository();

  async create(
    data:CreateDesignationDto
  ){

    const exists =
    await this.repository.findByName(

      data.tenantId,

      data.name

    );

    if(exists){

      throw new Error(
        "Designation already exists."
      );

    }

    return this.repository.create(data);

  }

  async getAll(
    tenantId:string
  ){

    return this.repository.findAll(
      tenantId
    );

  }

  async getById(id:string){

    const designation =
    await this.repository.findById(id);

    if(!designation){

      throw new Error(
        "Designation not found."
      );

    }

    return designation;

  }

  async update(
    id:string,
    data:any
  ){

    return this.repository.update(
      id,
      data
    );

  }

  async delete(id:string){

    await this.repository.delete(id);

    return{

      message:
      "Designation deleted successfully."

    };

  }

}