import { z } from "zod";  
import { UserRole } from "../@types/enums";

export const CreateUserSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  role: z.nativeEnum(UserRole),

  avatarUrl: z.string().url().optional(),
  phone: z.string().min(6).max(20).optional(),
  address: z.string().min(2).max(200).optional(),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  avatarUrl: z.string().url().optional(),
  phone: z.string().min(6).max(20).optional(),
  address: z.string().min(2).max(200).optional(),
  lastSeenAt: z.coerce.date().optional(),
  isBlocked: z.boolean().optional(),
});
