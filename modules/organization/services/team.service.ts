import { TeamRepository } from "../repositories/team.repository";
import { CreateTeamDto } from "../dto/create-team.dto";

export class TeamService {

  private repository =
  new TeamRepository();

  async create(
    data:CreateTeamDto
  ){

    const exists =
    await this.repository.findByName(

      data.name,

      data.departmentId

    );

    if(exists){

      throw new Error(
        "Team already exists."
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

    const team =
    await this.repository.findById(id);

    if(!team){

      throw new Error(
        "Team not found."
      );

    }

    return team;

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
      "Team deleted successfully."

    };

  }

}