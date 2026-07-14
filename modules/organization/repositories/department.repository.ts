import prisma from "../../../database/prisma.service";

export class DepartmentRepository {

  create(data:any){

    return prisma.department.create({

      data

    });

  }

  findById(id:string){

    return prisma.department.findUnique({

      where:{id}

    });

  }

  findByName(name:string,tenantId:string){

    return prisma.department.findFirst({

      where:{
        name,
        tenantId
      }

    });

  }

  findAll(tenantId:string){

    return prisma.department.findMany({

      where:{
        tenantId
      },

      orderBy:{
        createdAt:"asc"
      }

    });

  }

  delete(id:string){

    return prisma.department.delete({

      where:{id}

    });

  }

}