import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constant/httpStatus";
import asyncHandler from "../utils/AsyncHandler";

// JWT payload interface
interface JWTPayload {
  userId: string;
  role: string;
}

// Extend Express Request type to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: JWTPayload;
  }
}

export const isAuthenticated = asyncHandler(
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.token || req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Access token required");
      }

      const secretKey = process.env.JWT_SECRET_KEY;
      if (!secretKey) {
        throw new Error("JWT secret key is not set in environment variables");
      }

      const decoded = jwt.verify(token, secretKey) as JWTPayload;

      req.user = {
        userId: decoded.userId,
        role: decoded.role,
      };

      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return next(
          new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            "Token expired, please login again",
          ),
        );
      }

      if (err instanceof jwt.JsonWebTokenError) {
        return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid token"));
      }

      next(err);
    }
  },
);
