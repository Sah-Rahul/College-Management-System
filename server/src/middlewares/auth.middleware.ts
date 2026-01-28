import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { AuthRequest, AuthUser } from "../@types/auth.types";

export const isAuthenticated = asyncHandler(
  async (req: AuthRequest, _res, next) => {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) throw new ApiError(401, "Token missing");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as AuthUser;

    req.user = decoded;
    next();
  }
);
