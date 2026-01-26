import { z } from "zod";

export const ExamTypeEnum = z.enum([
  "class_test",
  "first_term",
  "second_term",
  "final",
]);
export const ExamStatusEnum = z.enum([
  "scheduled",
  "ongoing",
  "completed",
  "cancelled",
]);

export const CreateExamSchema = z
  .object({
    name: z
      .string()
      .min(3, "Exam name must be at least 3 characters")
      .max(200, "Exam name is too long"),
    type: ExamTypeEnum,
    course: z.string().min(1, "Course ID is required"),
    semester: z.number().int().min(1).max(12),
    section: z.string().max(5).optional(),
    academicYear: z
      .string()
      .regex(/^\d{4}-\d{4}$/, "Academic year format should be YYYY-YYYY"),
    startDate: z.date(),
    endDate: z.date(),
    description: z.string().max(1000).optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
  });

export const UpdateExamSchema = CreateExamSchema.partial();

export const UpdateExamStatusSchema = z.object({
  examId: z.string().min(1, "Exam ID is required"),
  status: ExamStatusEnum,
});

export const PublishExamResultSchema = z.object({
  examId: z.string().min(1, "Exam ID is required"),
});

export const GetExamByIdSchema = z.object({
  id: z.string().min(1, "Exam ID is required"),
});

export const GetExamsSchema = z.object({
  course: z.string().optional(),
  semester: z.number().int().min(1).optional(),
  section: z.string().optional(),
  academicYear: z
    .string()
    .regex(/^\d{4}-\d{4}$/)
    .optional(),
  type: ExamTypeEnum.optional(),
  status: ExamStatusEnum.optional(),
});

export const GetExamsByCourseSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  semester: z.number().int().min(1).optional(),
  academicYear: z.string().optional(),
});

export const GetUpcomingExamsSchema = z.object({
  studentId: z.string().optional(),
  teacherId: z.string().optional(),
  days: z.number().int().min(1).max(90).optional(),
});

export const DeleteExamSchema = z.object({
  id: z.string().min(1, "Exam ID is required"),
});

// Type exports
export type CreateExamInput = z.infer<typeof CreateExamSchema>;
export type UpdateExamInput = z.infer<typeof UpdateExamSchema>;
export type UpdateExamStatusInput = z.infer<typeof UpdateExamStatusSchema>;
export type PublishExamResultInput = z.infer<typeof PublishExamResultSchema>;
export type GetExamByIdInput = z.infer<typeof GetExamByIdSchema>;
export type GetExamsInput = z.infer<typeof GetExamsSchema>;
export type GetExamsByCourseInput = z.infer<typeof GetExamsByCourseSchema>;
export type GetUpcomingExamsInput = z.infer<typeof GetUpcomingExamsSchema>;
export type DeleteExamInput = z.infer<typeof DeleteExamSchema>;
