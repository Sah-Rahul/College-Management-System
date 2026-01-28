import { Request } from "express";

export type UserRole = "admin" | "teacher" | "staff" | "student";

export interface AuthUser {
  id: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}