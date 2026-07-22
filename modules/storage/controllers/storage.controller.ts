import { Request, Response, NextFunction } from "express";


import { StorageService } from "../services/storage.service";

const storageService = new StorageService();

export class StorageController {

  uploadTenantLogo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      if (!req.file) {

        return res.status(400).json({

          success: false,

          message: "Logo file is required.",

        });

      }

      const result = storageService.saveTenantLogo(
        req.file
      );

      return res.status(201).json({

        success: true,

        message: "Logo uploaded successfully.",

        data: result,

      });

    } catch (error) {

      next(error);

    }

  }

  deleteTenantLogo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      storageService.deleteTenantLogo(
        req.params.filename as string
      );

      return res.status(200).json({

        success: true,

        message: "Logo deleted successfully.",

      });

    } catch (error) {

      next(error);

    }

  }

}