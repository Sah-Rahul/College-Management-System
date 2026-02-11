import { Request, Response } from "express";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import StudentModel from "../model/student.model";
import bcrypt from "bcryptjs";
import { UserRole } from "../@types/enums";
import { AuthRequest } from "../@types/auth.types";
import { uploadToCloudinary } from "../config/cloudinary.config";
import fs from "fs";
import { sendToken } from "../utils/Token";

export const studentRegister = asyncHandler(
  async (req: Request, res: Response) => {
    const { studentName, email, password } = req.body;

    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      throw new ApiError(409, "Student already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await StudentModel.create({
      studentName,
      email,
      password: hashedPassword,
      role: UserRole.STUDENT,
      isActive: true,
    });

    res.status(201).json(
      new ApiResponse(
        201,
        {
          id: student._id,
          studentName: student.studentName,
          email: student.email,
          role: student.role,
        },
        "Student registered successfully",
      ),
    );
  },
);

export const studentLogin = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const student = await StudentModel.findOne({ email }).select("+password");
    if (!student) {
      throw new ApiError(404, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    sendToken({
      user: {
        id: student._id.toString(),
        studentName: student.studentName,
        email: student.email,
        role: student.role
      },
      statusCode: 200,
      res,
      message: `Welcome back ${student.studentName}`,
    });
  },
);

export const studentLogout = asyncHandler(
  async (req: Request, res: Response) => {
    res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json(new ApiResponse(200, null, "Logout successful"));
  },
);

export const studentProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const student = await StudentModel.findById(req.user?._id).select(
      "-password",
    );

    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, student, "Profile fetched successfully"));
  },
);

export const updateProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { studentName } = req.body;

    const updateData: any = {};
    if (studentName) updateData.studentName = studentName;

    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);

      const cloudResult = await uploadToCloudinary(fileBuffer, "students");

      updateData.profileImage = cloudResult.secure_url;

      fs.unlinkSync(req.file.path);
    }

    const student = await StudentModel.findByIdAndUpdate(
      req.user!._id,
      updateData,
      { new: true },
    ).select("-password");

    res
      .status(200)
      .json(new ApiResponse(200, student, "Profile updated successfully"));
  },
);
