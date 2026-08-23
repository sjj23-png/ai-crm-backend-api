



import {
  Request,
  Response,
} from "express";

import { LeadService } from "../services/lead.service";

export class LeadController {

  private service =
    new LeadService();

  create = async (

    req: Request,

    res: Response

  ) => {

    try {

      const dto = { ...req.body, tenantId: req.user!.tenantId };
      const result = await this.service.create(dto);

      return res
        .status(201)
        .json(result);

    }

    catch (error: any) {

      return res
        .status(400)
        .json({

          message:
            error.message,

        });

    }

  };

  getAll = async (

    req: Request,

    res: Response

  ) => {

    const result =
      await this.service.getAll(

        req.user!.tenantId

      );

    return res.json(result);

  };

  getById = async (

    req: Request,

    res: Response

  ) => {

    try {

      const result =
        await this.service.getById(
          req.params.id as string
        );

      return res.json(result);

    }

    catch (error: any) {

      return res
        .status(404)
        .json({

          message:
            error.message,

        });

    }

  };

  update = async (

    req: Request,

    res: Response

  ) => {

    try {

      const result =
        await this.service.update(

          req.params.id as string,

          req.body

        );

      return res.json(result);

    }

    catch (error: any) {

      return res
        .status(400)
        .json({

          message:
            error.message,

        });

    }

  };

  delete = async (

    req: Request,

    res: Response

  ) => {

    try {

      const result =
        await this.service.delete(
          req.params.id as string
        );

      return res.json(result);

    }

    catch (error: any) {

      return res
        .status(400)
        .json({

          message:
            error.message,

        });

    }

  };

}