import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { AdminModel } from "../models/admin.model";

export const isAdmin = asyncHandler(
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const token = req.cookies?.adminToken;

    if (!token) throw new ApiError(401, "Unauthorized: Admin token missing");

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN!);
    } catch (error) {
      throw new ApiError(401, "Invalid or expired admin token");
    }

    const admin = await AdminModel.findById(decoded.id);
    if (!admin) throw new ApiError(404, "Admin not found");

    if (admin.level !== "admin") {
      throw new ApiError(403, "Forbidden: Admin access required");
    }

    req.user = admin;  
    next();
  }
);
