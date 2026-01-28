import  jwt  from "jsonwebtoken";
import { AuthRequest, AuthUser } from "../@types/auth.types";
import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/AsyncHandler";

export const isTeacher = asyncHandler(
  async (req: AuthRequest, _res, next) => {
    const token = req.cookies?.teacherToken;
    if (!token) throw new ApiError(401, "Teacher token missing");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_TEACHER!
    ) as AuthUser;

    if (decoded.role !== "teacher") {
      throw new ApiError(403, "Teacher access only");
    }

    req.user = decoded;  
    next();
  }
);