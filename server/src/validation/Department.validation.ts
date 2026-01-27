 
import { z } from "zod";

export const CreateDepartmentSchema = z.object({
  name: z.string().min(2, "Department name is required"),
  code: z
    .string()
    .min(2, "Department code is required")
    .max(10, "Department code too long")
    .regex(/^[A-Z0-9]+$/, "Code must be uppercase letters or numbers"),
  description: z.string().optional(),
  hod: z.string().length(24, "Invalid HOD user ID").optional(),  
  totalStudents: z.number().min(0).optional(),
  totalTeachers: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const UpdateDepartmentSchema = z.object({
  name: z.string().min(2).optional(),
  code: z
    .string()
    .min(2)
    .max(10)
    .regex(/^[A-Z0-9]+$/)
    .optional(),
  description: z.string().optional(),
  hod: z.string().length(24).optional(),
  totalStudents: z.number().min(0).optional(),
  totalTeachers: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});
