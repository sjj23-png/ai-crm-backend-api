import { Request, Response } from "express";
import { RolePermissionService } from "../services/role-permission.service";

export class RolePermissionController {

  private service =
    new RolePermissionService();

  assign = async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await this.service.assignPermissions(

          req.body.roleId,

          req.body.permissionIds

        );

      return res.json(result);

    } catch (error: any) {

      return res.status(400).json({

        message: error.message

      });

    }

  };

  getPermissions = async (
    req: Request,
    res: Response
  ) => {

    const result =
      await this.service.getPermissions(
        req.params.roleId as string
      );

    return res.json(result);

  };

  remove = async (
    req: Request,
    res: Response
  ) => {

    const result =
      await this.service.removePermission(

        req.params.roleId as string,

        req.params.permissionId as string

      );

    return res.json(result);

  };

}