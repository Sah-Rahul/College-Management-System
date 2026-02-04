import { Request, Response } from "express"; 
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";

export const createQuestion = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(201).json(new ApiResponse(201, null, "Create question"));
});

export const updateQuestion = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Update question"));
});

export const deleteQuestion = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Delete question"));
});

export const getQuestionById = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Get question"));
});

export const listQuestions = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "List questions"));
});
