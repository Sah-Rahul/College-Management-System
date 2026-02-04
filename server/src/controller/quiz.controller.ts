import { Request, Response } from "express"; 
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";

export const createQuiz = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(201).json(new ApiResponse(201, null, "Create quiz"));
});

export const updateQuiz = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Update quiz"));
});

export const deleteQuiz = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Delete quiz"));
});

export const getQuizById = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "Get quiz"));
});

export const listQuizzes = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, null, "List quizzes"));
});
