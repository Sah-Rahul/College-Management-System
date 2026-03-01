import { Request } from "express";

export const getValidParamId = (req: Request): string => {
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    throw new Error("Invalid or missing resource id");
  }

  return id;
};