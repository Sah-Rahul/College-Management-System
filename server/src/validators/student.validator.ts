import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map(
        (i) => `${i.path.join(".")}: ${i.message}`,
      );
      throw new ApiError(400, "Validation failed", errors);
    }

    req.body = result.data;
    next();
  };
