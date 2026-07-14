import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";

export function globalErrorHandler(
  err: Error & {
    status?: number;},
    
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
}