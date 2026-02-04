import { Request, Response } from "express"; 
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";

export const submitAssignment = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(201).json(new ApiResponse(201, null, "Submit assignment"));
});

export const updateSubmission = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Update submission"));
});

export const getSubmissionById = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Get submission"));
});

export const listSubmissions = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "List submissions"));
});
