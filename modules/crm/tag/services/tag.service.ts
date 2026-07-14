import { TagRepository } from "../repositories/tag.repository";
import { CreateTagDto } from "../dto/create-tag.dto";

export class TagService {

  private repository =
    new TagRepository();

  async createTag(

    data:CreateTagDto

  ){

    const exists =

      await this.repository.findByName(

        data.tenantId,

        data.name

      );

    if(exists){

      throw new Error(

        "Tag already exists."

      );

    }

    return this.repository.create({

      ...data,

      publicId:"TAG-TODO"

    });

  }

  async getTags(

    tenantId:string

  ){

    return this.repository.findAll(

      tenantId

    );

  }

  async updateTag(

    id:string,

    data:any

  ){

    return this.repository.update(

      id,

      data

    );

  }

  async deleteTag(

    id:string

  ){

    return this.repository.softDelete(

      id

    );

  }

}