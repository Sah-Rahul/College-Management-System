import jwt from "jsonwebtoken"; 
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError"; 
import { AuthRequest, AuthUser } from "../@types/auth.types";

export const isAdmin = asyncHandler(
  async (req: AuthRequest, _res, next) => {
    const token = req.cookies?.adminToken;
    if (!token) throw new ApiError(401, "Admin token missing");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_ADMIN!
    ) as AuthUser;

    if (decoded.role !== "admin") {
      throw new ApiError(403, "Admin access only");
    }

    req.user = decoded;
    next();
  }
);
