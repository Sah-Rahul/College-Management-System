import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const validateRequest =
  (schema: ZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = err.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        }));

        return next(new ApiError(400, "Validation error", formattedErrors));
      }

      next(err);
    }
  };
