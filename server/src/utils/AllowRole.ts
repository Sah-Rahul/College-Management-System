import { AuthRequest } from "../@types/auth.types";
import { ApiError } from "./ApiError";
import asyncHandler from "./AsyncHandler";

export const allowRoles = (...roles: string[]) =>
  asyncHandler(async (req: AuthRequest, _res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Access denied");
    }

    next();
  });