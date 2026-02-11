import { z } from "zod";
import { UserRole } from "../@types/enums";

export const CreateStudentSchema = z.object({
  studentName: z
    .string()
    .min(2, "Student name must be at least 2 characters")
    .max(100, "Student name must be less than 100 characters"),

  email: z
    .string()
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email format is invalid",
    ),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number, and special character",
    ),

  studentImage: z.string().url("Student image must be a valid URL").optional(),

  role: z.nativeEnum(UserRole).optional(),

  enrolledCourses: z.array(z.string()).optional(),
  enrolledInstitute: z.array(z.string()).optional(),

  isActive: z.boolean().optional(),
});

export const StudentLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const UpdateStudentSchema = z.object({
  studentName: z.string().min(2).max(100).optional(), 
});

export type CreateStudentDTO = z.infer<typeof CreateStudentSchema>;
export type StudentLoginDTO = z.infer<typeof StudentLoginSchema>;
export type UpdateStudentDTO = z.infer<typeof UpdateStudentSchema>;
