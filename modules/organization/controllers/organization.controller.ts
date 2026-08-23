import { Request, Response } from "express";
import { OrganizationService } from "../services/organization.service";
import { UpdateUserOrganizationSchema } from "../dto/update-user-organization.dto";

export class OrganizationController {
  private service = new OrganizationService();

  assign = async (req: Request, res: Response) => {
    try {
      const data = UpdateUserOrganizationSchema.parse(req.body);
      const result = await this.service.assign(
        req.user!.tenantId,
        req.params.userId as string,
        data
      );

      return res.json({
        success: true,
        message: "User organization settings updated successfully.",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  hierarchy = async (req: Request, res: Response) => {
    try {
      const result = await this.service.getHierarchy(
        req.user!.tenantId,
        req.params.userId as string
      );

      return res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}