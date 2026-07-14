import { Request, Response } from "express";
import { DesignationService } from "../services/designation.service";

export class DesignationController{

  private service =
  new DesignationService();

  create = async(
    req:Request,
    res:Response
  )=>{

    try{

      const result =
      await this.service.create(req.body);

      return res.status(201).json(result);

    }

    catch(error:any){

      return res.status(400).json({

        message:error.message

      });

    }

  };

  getAll = async(
    req:Request,
    res:Response
  )=>{

    const result =
    await this.service.getAll(
      req.user!.tenantId
    );

    return res.json(result);

  };

  getById = async(
    req:Request,
    res:Response
  )=>{

    try{

      const result =
      await this.service.getById(
        req.params.id as string
      );

      return res.json(result);

    }

    catch(error:any){

      return res.status(404).json({

        message:error.message

      });

    }

  };

}