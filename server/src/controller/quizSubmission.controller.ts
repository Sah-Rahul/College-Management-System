import { Request, Response } from "express"; 
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";

export const startQuiz = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(201).json(new ApiResponse(201, null, "Start quiz"));
});

export const submitQuiz = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Submit quiz"));
});

export const getMySubmission = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Get my submission"));
});

export const listSubmissionsByQuiz = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "List submissions by quiz"));
});
