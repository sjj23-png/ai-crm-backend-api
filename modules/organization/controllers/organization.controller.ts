import {
  Request,
  Response,
} from "express";

import { OrganizationService } from "../services/organization.service";

export class OrganizationController {

  private service =
    new OrganizationService();

  create = async (
    req: Request,
    res: Response
  ) => {

    const result =
      await this.service.create(
        req.tenantId!,
        req.body
      );

    return res.status(201).json(result);

  };

  getAll = async (
    req: Request,
    res: Response
  ) => {

    const result =
      await this.service.getAll(
        req.tenantId!
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
        req.params.id  as string,
        req.body
      );

    return res.json(result);

  };

  delete = async (
    req: Request,
    res: Response
  ) => {

    const result =
      await this.service.delete(
        req.params.id as string
      );

    return res.json(result);

  };

}