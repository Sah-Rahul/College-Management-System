import { Request } from "express";

export const getAuthUserId = (req: Request): string => {
  const userId = (req as any).user?.userId;

  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  return userId;
};