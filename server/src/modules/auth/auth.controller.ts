import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import asyncHandler from "../../utils/AsyncHandler";
import { sendToken } from "../../utils/sendToken";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.registerService(req.body);
  res
    .status(HTTP_STATUS.CREATED)
    .json(new ApiResponse(HTTP_STATUS.CREATED, result.user, result.message));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.loginService(req.body);

  sendToken({
    user,
    statusCode: HTTP_STATUS.OK,
    res,
    message: `Welcome back ${user.firstName}`,
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  const result = await authService.logoutService(userId);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const response = await authService.forgotPasswordService(req.body);
    res.status(response.statusCode).json(response);
  },
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const response = await authService.resetPasswordService(req.body);
    res.status(response.statusCode).json(response);
  },
);

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const response = await authService.verifyEmailService(req.body);
  res.status(response.statusCode).json(response);
});

export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;

    if (!userId) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
    }

    const response = await authService.changePasswordService(userId, req.body);
    res.status(response.statusCode).json(response);
  },
);
