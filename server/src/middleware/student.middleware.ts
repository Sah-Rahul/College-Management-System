import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import StudentModel from "../model/student.model";
import { AuthRequest } from "../@types/auth.types";
import { UserRole } from "../@types/enums";

export const isAuthenticated = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Not authenticated. Token missing.");
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    } catch (err) {
      throw new ApiError(401, "Invalid or expired token.");
    }

    const student = await StudentModel.findById(decoded.id).select("-password");
    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    req.user = {
      _id: student._id.toString(),
       role: student.role,
    };
    next();
  },
);
