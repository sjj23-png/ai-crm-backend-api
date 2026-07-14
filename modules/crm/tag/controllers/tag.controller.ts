import { Request, Response } from "express";
import { TagService } from "../services/tag.service";

export class TagController {

  private service = new TagService();

  create = async (
    req: Request,
    res: Response
  ) => {

    try {

      const tag =
        await this.service.createTag(
          req.body
        );

      return res.status(201).json(tag);

    } catch (error: any) {

      return res.status(400).json({

        message: error.message

      });

    }

  };

  getAll = async (
    req: Request,
    res: Response
  ) => {

    const tags =
      await this.service.getTags(
        req.user!.tenantId
      );

    return res.json(tags);

  };

  update = async (
    req: Request,
    res: Response
  ) => {

    const tag =
      await this.service.updateTag(
        req.params.id as string,
        req.body
      );

    return res.json(tag);

  };

  delete = async (
    req: Request,
    res: Response
  ) => {

    const tag =
      await this.service.deleteTag(
        req.params.id as string
      );

    return res.json(tag);

  };

}