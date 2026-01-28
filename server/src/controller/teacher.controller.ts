import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/AsyncHandler";
import { Request, Response } from "express"; 
import { TeacherModel } from "../models/teacher.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const loginTeacher = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const teacher = await TeacherModel.findOne({ email });
  if (!teacher) throw new ApiError(404, "Teacher not found");

  const isMatch = await bcrypt.compare(password, teacher.password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  const token = jwt.sign(
    { id: teacher._id, role: "teacher" },
    process.env.JWT_SECRET_TEACHER!,
    { expiresIn: "7d" }
  );

  res.cookie("teacherToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json(new ApiResponse(200, teacher, "Teacher logged in successfully"));
});

export const logoutTeacher = asyncHandler(async (_req, res: Response) => {
  res.clearCookie("teacherToken");
  res.json(new ApiResponse(200, null, "Teacher logged out"));
});

export const teacherProfile = asyncHandler(async (_req, res: Response) => {
  res.clearCookie("teacherToken");
  res.json(new ApiResponse(200, null, "Teacher logged out"));
});


export const changeTeacherPassword = asyncHandler(async (req: any, res: Response) => {
const { oldPassword, newPassword } = req.body;


const teacher = await TeacherModel.findById(req.user.id);
if (!teacher) throw new ApiError(404, "Teacher not found");


const isMatch = await bcrypt.compare(oldPassword, teacher.password);
if (!isMatch) throw new ApiError(400, "Old password incorrect");


teacher.password = newPassword; // 🔥 pre-save hook hashes
await teacher.save();


res.json(
new ApiResponse(200, null, "Password changed successfully")
);
}
);

export const updateTeacherProfile = asyncHandler(
  async (req: any, res: Response) => {
    const updates = req.body;

    const teacher = await TeacherModel.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    );

    if (!teacher) throw new ApiError(404, "Teacher not found");

    res.json(
      new ApiResponse(200, teacher, "Profile updated successfully")
    );
  }
);