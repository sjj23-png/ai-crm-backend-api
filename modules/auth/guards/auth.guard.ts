import { NextFunction, Request, Response } from "express";
import { JwtUtil } from "../utils/jwt.util";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         userId: string;
//         tenantId: string;
//         roleId: string;
//       };
//     }
//   }
// }

export const authGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    req.user = JwtUtil.verifyAccessToken(token);

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};