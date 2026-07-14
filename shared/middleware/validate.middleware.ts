import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {

  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });

    }

    const data = result.data as {
      body?: unknown;
      params?: unknown;
      query?: unknown;
    };

    if (data.body) {
      req.body = data.body;
    }




    if (data.params) {
      req.params = data.params as Request["params"];
    }

    if (data.query) {
      req.query = data.query as Request["query"];
    }

    next();
  };
}