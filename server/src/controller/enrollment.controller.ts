import { Request, Response } from "express";
import asyncHandler from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const enrollStudent = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(201).json(new ApiResponse(201, null, "Enroll student"));
});

export const cancelEnrollment = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Cancel enrollment"));
});

export const listEnrollments = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "List enrollments"));
});
