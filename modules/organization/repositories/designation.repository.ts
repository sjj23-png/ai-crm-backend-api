import prisma from "../../../database/prisma.service";


export class DesignationRepository {

  create(data:any){

    return prisma.designation.create({

      data

    });

  }

  findByName(
    tenantId:string,
    name:string
  ){

    return prisma.designation.findFirst({

      where:{
        tenantId,
        name
      }

    });

  }

  findById(id:string){

    return prisma.designation.findUnique({

      where:{
        id
      }

    });

  }

  findAll(tenantId:string){

    return prisma.designation.findMany({

      where:{
        tenantId
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

    return prisma.designation.update({

      where:{
        id
      },

      data

    });

  }

  delete(id:string){

    return prisma.designation.delete({

      where:{
        id
      }

    });

  }

}