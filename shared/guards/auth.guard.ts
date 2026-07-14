import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../../config/environment/env";

interface JwtPayload {
  id: string;
  tenantId: string;
  roleId: string;
  email: string;
}

export const authGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        message: "Authentication token is required.",
      });
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Invalid authorization header.",
      });
    }

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    ) as JwtPayload;

    req.user = {
      id: decoded.id,
      tenantId: decoded.tenantId,
      roleId: decoded.roleId,
      email: decoded.email,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};