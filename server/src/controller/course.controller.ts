import { Request, Response } from "express"; 
import asyncHandler from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const createCourse = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(201).json(new ApiResponse(201, null, "Create course"));
});

export const updateCourse = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Update course"));
});

export const deleteCourse = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Delete course"));
});

export const getCourseById = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Get course"));
});

export const listCourses = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "List courses"));
});
