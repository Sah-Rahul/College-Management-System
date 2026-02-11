import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { UserRole } from "../@types/enums";
import { AuthRequest } from "../@types/auth.types";

export const allowRoles = (...roles: UserRole[]) =>
  asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new ApiError(401, "Unauthorized");
    }

    if (!roles.includes(user.role)) {
      throw new ApiError(403, "You are not allowed to access this resource");
    }

    next();
  });
