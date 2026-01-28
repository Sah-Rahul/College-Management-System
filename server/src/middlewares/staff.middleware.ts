import  jwt  from "jsonwebtoken";
import { AuthRequest, AuthUser } from "../@types/auth.types";
import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/AsyncHandler";

export const isStaff = asyncHandler(
  async (req: AuthRequest, _res, next) => {
    const token = req.cookies?.staffToken;
    if (!token) throw new ApiError(401, "Staff token missing");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_STAFF!
    ) as AuthUser;

    if (decoded.role !== "staff") {
      throw new ApiError(403, "Staff access only");
    }

    req.user = decoded;
    next();
  }
);