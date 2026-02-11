import { Request } from "express";
import { UserRole } from "./enums";
import { Express } from "express";

export interface AuthUserPayload {
  _id: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: AuthUserPayload;
  isEnrolled?: boolean;

 
  file?: Express.Multer.File;
}
