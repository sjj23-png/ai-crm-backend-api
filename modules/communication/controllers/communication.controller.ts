import { Request, Response } from "express";

import { CommunicationService } from "../services/communication.service";

export class CommunicationController {

  private service =
    new CommunicationService();

  create = async (
    req: Request,
    res: Response
  ) => {
    const result = await this.service.create(
      req.user!.tenantId,
      req.user!.id,
      req.body
    );

    return res.status(201).json(result);
  };

  getAll = async (
    req: Request,
    res: Response
  ) => {
    const result = await this.service.getAll(
      req.user!.tenantId,
      req.query
    );

    return res.json(result);
  };

  getById = async (
    req: Request,
    res: Response
  ) => {
    const result = await this.service.getById(
      req.params.id as string
    );

    return res.json(result);
  };

  getByPublicId = async (
    req: Request,
    res: Response
  ) => {
    const result = await this.service.getByPublicId(
      req.params.publicId as string
    );

    return res.json(result);
  };

  update = async (
    req: Request,
    res: Response
  ) => {
    const result = await this.service.update(
      req.params.id as string,
      req.user!.id,
      req.body
    );

    return res.json(result);
  };

  markSent = async (
    req: Request,
    res: Response
  ) => {
    const result = await this.service.markSent(
      req.params.id as string
    );

    return res.json(result);
  };

  markDelivered = async (
    req: Request,
    res: Response
  ) => {
    const result = await this.service.markDelivered(
      req.params.id as string
    );

    return res.json(result);
  };

  markRead = async (
    req: Request,
    res: Response
  ) => {
    const result = await this.service.markRead(
      req.params.id as string
    );

    return res.json(result);
  };

  delete = async (
    req: Request,
    res: Response
  ) => {
    await this.service.delete(
      req.params.id as string,
      req.user!.id
    );

    return res.json({
      success: true,
      message: "Communication deleted successfully."
    });

  };

}