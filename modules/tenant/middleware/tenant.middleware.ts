import {
  Request,
  Response,
  NextFunction,
} from "express";

export const tenantMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tenantId =
      req.headers["x-tenant-id"] ??
      req.user?.tenantId;

    if (!tenantId) {
      return res.status(400).json({
        message: "Tenant not found.",
      });
    }

    req.tenantId = String(tenantId);

    next();
  } catch {
    return res.status(500).json({
      message: "Tenant middleware error.",
    });
  }
};