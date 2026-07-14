import prisma from "../../../database/prisma.service";


export class TeamRepository {

  create(data:any){

    return prisma.team.create({

      data

    });

  }

  findById(id:string){

    return prisma.team.findUnique({

      where:{
        id
      },

      include:{
        department:true,
        lead:true,
        members:true
      }

    });

  }

  findByName(
    name:string,
    departmentId:string
  ){

    return prisma.team.findFirst({

      where:{
        name,
        departmentId
      }

    });

  }

  findAll(tenantId:string){

    return prisma.team.findMany({

      where:{
        tenantId
      },

      include:{
        department:true,
        lead:true
      },

      orderBy:{
        createdAt:"asc"
      }

    });

  }

  update(
    id:string,
    data:any
  ){

    return prisma.team.update({

      where:{
        id
      },

      data

    });

  }

  delete(id:string){

    return prisma.team.delete({

      where:{
        id
      }

    });

  }

}