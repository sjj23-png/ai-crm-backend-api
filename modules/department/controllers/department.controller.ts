import { Request, Response } from "express";

import { DepartmentService } from "../services/department.service";

export class DepartmentController {

  private service =
    new DepartmentService();

  create = async (
    req: Request,
    res: Response
  ) => {

    const tenantId =
      req.user!.tenantId;

    const result =
      await this.service.create(
        tenantId,
        req.body
      );

    return res
      .status(201)
      .json(result);

  };

  getAll = async (
    req: Request,
    res: Response
  ) => {

    const tenantId =
      req.user!.tenantId;

    const result =
      await this.service.getAll(
        tenantId
      );

    return res.json(result);

  };

  getById = async (
    req: Request,
    res: Response
  ) => {

    const result =
      await this.service.getById(
        req.params.id as string
      );

    return res.json(result);

  };

  update = async (
    req: Request,
    res: Response
  ) => {

    const result =
      await this.service.update(
        req.params.id as string ,
        req.body
      );

    return res.json(result);

  };

  delete = async (
    req: Request,
    res: Response
  ) => {

    await this.service.delete(
      req.params.id as string
    );

    return res.json({
      message:
        "Department deleted successfully."
    });

  };

}