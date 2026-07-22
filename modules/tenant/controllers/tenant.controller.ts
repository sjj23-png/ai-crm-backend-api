import { Request, Response } from "express";
import { TenantService } from "../services/tenant.service";
import { CreateTenantSchema } from "../dto/create-tenant.dto";

export class TenantController {
  private readonly service = new TenantService();

  create = async (req: Request, res: Response) => {
   try {

      const data =
        CreateTenantSchema.parse(req.body);

      const tenant =
        await this.service.createTenant(data);

      return res.status(201).json({
        success: true,
        data: tenant,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  };



  update = async (
    req: Request,
    res: Response
  ) => {
    try {
      const tenant = await this.service.update(
        req.params.id as string,
        req.body
      );

      return res.json(tenant);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
  getAll = async (_: Request, res: Response) => {
    const tenants = await this.service.getAll();

    return res.json(tenants);
  };

  getById = async (req: Request, res: Response) => {
    try {
      const tenant = await this.service.getById(req.params.id as string);

      return res.json(tenant);
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const result = await this.service.delete(req.params.id as string);

      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
}