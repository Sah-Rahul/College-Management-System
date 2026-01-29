import { z } from "zod";

export const CreateTeacherSchema = z.object({
  teacherName: z
    .string()
    .min(2, "Teacher name must be at least 2 characters")
    .max(100, "Teacher name can't exceed 100 characters"),
  email: z.string().email().optional(),
  employeeId: z
    .string()
    .min(2, "Employee ID must be at least 2 characters")
    .max(20, "Employee ID can't exceed 20 characters")
    .optional(),
  department: z
    .string()
    .length(24, "Invalid department ID")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId")
    .optional(),
  designation: z.string().min(2, "Designation is required").max(50).optional(),
  qualification: z
    .string()
    .min(2, "Qualification is required")
    .max(100)
    .optional(),
  profilePicture: z.string().optional(),
  experience: z
    .number()
    .min(0, "Experience cannot be negative")
    .max(50, "Experience seems too high")
    .optional()
    .optional(),
  subjects: z
    .array(
      z
        .string()
        .length(24, "Invalid subject ID")
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
    )
    .optional(),
  joiningDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date")
    .optional(),
});

export const LoginTeacherSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const ChangeTeacherPasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export const UpdateTeacherProfileSchema = z.object({
  teacherName: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  employeeId: z.string().min(2).max(20).optional(),
  designation: z.string().min(2).max(50).optional(),
  qualification: z.string().min(2).max(100).optional(),
  experience: z.coerce.number().min(0).max(50).optional(),
});
