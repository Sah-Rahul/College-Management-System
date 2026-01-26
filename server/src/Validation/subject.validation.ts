import { z } from "zod";

export const SubjectTypeEnum = z.enum(["theory", "practical", "both"]);

export const CreateSubjectSchema = z.object({
  name: z
    .string()
    .min(2, "Subject name must be at least 2 characters")
    .max(100, "Subject name is too long"),
  code: z
    .string()
    .min(2, "Subject code must be at least 2 characters")
    .max(10, "Subject code is too long")
    .toUpperCase(),
  department: z.string().min(1, "Department is required"),
  course: z.string().min(1, "Course is required"),
  semester: z
    .number()
    .int("Semester must be an integer")
    .min(1, "Semester must be at least 1")
    .max(12, "Semester cannot exceed 12"),
  credits: z
    .number()
    .min(0, "Credits cannot be negative")
    .max(10, "Credits cannot exceed 10"),
  type: SubjectTypeEnum.default("theory"),
  assignedTeacher: z.string().optional(),
  totalClasses: z.number().int().min(0).optional(),
  isActive: z.boolean().default(true),
});

export const UpdateSubjectSchema = CreateSubjectSchema.partial();

export const AssignTeacherSchema = z.object({
  subjectId: z.string().min(1, "Subject ID is required"),
  teacherId: z.string().min(1, "Teacher ID is required"),
});

export const GetSubjectByIdSchema = z.object({
  id: z.string().min(1, "Subject ID is required"),
});

export const GetSubjectsByCourseSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  semester: z.number().int().min(1).optional(),
});

// Type exports
export type CreateSubjectInput = z.infer<typeof CreateSubjectSchema>;
export type UpdateSubjectInput = z.infer<typeof UpdateSubjectSchema>;
export type AssignTeacherInput = z.infer<typeof AssignTeacherSchema>;
export type GetSubjectByIdInput = z.infer<typeof GetSubjectByIdSchema>;
export type GetSubjectsByCourseInput = z.infer<
  typeof GetSubjectsByCourseSchema
>;
