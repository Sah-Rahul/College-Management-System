import { Request, Response } from "express"; 
import asyncHandler from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const createAssignment = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(201).json(new ApiResponse(201, null, "Create assignment"));
});

export const updateAssignment = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Update assignment"));
});

export const deleteAssignment = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Delete assignment"));
});

export const getAssignmentById = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Get assignment"));
});

export const listAssignments = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "List assignments"));
});
