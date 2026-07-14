import prisma from "../../../../database/prisma.service";


export class TagRepository {

  create(data:any){

    return prisma.tag.create({

      data

    });

  }

  findByName(

    tenantId:string,

    name:string

  ){

    return prisma.tag.findFirst({

      where:{

        tenantId,

        name,

        deletedAt:null

      }

    });

  }

  findAll(

    tenantId:string

  ){

    return prisma.tag.findMany({

      where:{

        tenantId,

        deletedAt:null

      },

      orderBy:{

        name:"asc"

      }

    });

  }

  update(

    id:string,

    data:any

  ){

    return prisma.tag.update({

      where:{id},

      data

    });

  }

  softDelete(id:string){

    return prisma.tag.update({

      where:{id},

      data:{

        deletedAt:new Date()

      }

    });

  }

}