import { Request, Response } from "express";


import { TeamService } from "../services/team.service";

export class TeamController {
  private service = new TeamService();

  create = async (req: Request, res: Response) => {
    try {
      const result = await this.service.create(
        req.user!.tenantId,
        req.body
      );
      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to create team.",
      });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const result = await this.service.getAll(
        req.user!.tenantId,
        req.query
      );
      return res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to fetch teams.",
      });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const result = await this.service.getById(
        req.params.id as string
      );
      return res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to fetch team details.",
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const result = await this.service.update(
        req.params.id as string,
        req.body
      );
      return res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to update team.",
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.service.delete(
        req.params.id as string
      );
      return res.json({
        success: true,
        message: "Team deleted successfully."
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to delete team.",
      });
    }
  };
}