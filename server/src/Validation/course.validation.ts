import { z } from "zod";
import { CourseLevelEnum } from "../enums/enums";

export const CreateCourseSchema = z.object({
  name: z
    .string()
    .min(2, "Course name must be at least 2 characters")
    .max(100, "Course name is too long"),
  code: z
    .string()
    .min(2, "Course code must be at least 2 characters")
    .max(10, "Course code is too long")
    .toUpperCase(),
  level: CourseLevelEnum,
  department: z.string().min(1, "Department is required"),
  duration: z
    .number()
    .int("Duration must be an integer")
    .min(1, "Duration must be at least 1 year")
    .max(10, "Duration cannot exceed 10 years"),
  totalSemesters: z
    .number()
    .int("Total semesters must be an integer")
    .min(1, "Must have at least 1 semester")
    .max(20, "Total semesters cannot exceed 20"),
  description: z.string().max(500).optional(),
  isActive: z.boolean().default(true),
});

export const UpdateCourseSchema = CreateCourseSchema.partial();

export const GetCourseByIdSchema = z.object({
  id: z.string().min(1, "Course ID is required"),
});

export const GetCoursesByDepartmentSchema = z.object({
  departmentId: z.string().min(1, "Department ID is required"),
});

// Type exports
export type CreateCourseInput = z.infer<typeof CreateCourseSchema>;
export type UpdateCourseInput = z.infer<typeof UpdateCourseSchema>;
export type GetCourseByIdInput = z.infer<typeof GetCourseByIdSchema>;
export type GetCoursesByDepartmentInput = z.infer<
  typeof GetCoursesByDepartmentSchema
>;
