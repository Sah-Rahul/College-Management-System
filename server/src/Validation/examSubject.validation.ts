import { z } from "zod";

export const CreateExamSubjectSchema = z
  .object({
    exam: z.string().min(1, "Exam ID is required"),
    subject: z.string().min(1, "Subject ID is required"),
    examDate: z.date(),
    startTime: z
      .string()
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Invalid time format (HH:MM)",
      ),
    endTime: z
      .string()
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Invalid time format (HH:MM)",
      ),
    totalMarks: z.number().min(1, "Total marks must be at least 1"),
    passingMarks: z.number().min(0, "Passing marks cannot be negative"),
    room: z.string().max(50).optional(),
    duration: z.number().int().min(1).optional(),
    instructions: z.string().max(1000).optional(),
  })
  .refine((data) => data.passingMarks <= data.totalMarks, {
    message: "Passing marks cannot exceed total marks",
    path: ["passingMarks"],
  });

export const UpdateExamSubjectSchema = CreateExamSubjectSchema.partial().omit({
  exam: true,
});

export const BulkCreateExamSubjectSchema = z.object({
  examId: z.string().min(1, "Exam ID is required"),
  subjects: z
    .array(CreateExamSubjectSchema.omit({ exam: true }))
    .min(1, "At least one subject is required"),
});

export const GetExamSubjectsSchema = z.object({
  examId: z.string().min(1, "Exam ID is required"),
});

export const GetExamSubjectByIdSchema = z.object({
  id: z.string().min(1, "Exam Subject ID is required"),
});

export const DeleteExamSubjectSchema = z.object({
  id: z.string().min(1, "Exam Subject ID is required"),
});

// Type exports
export type CreateExamSubjectInput = z.infer<typeof CreateExamSubjectSchema>;
export type UpdateExamSubjectInput = z.infer<typeof UpdateExamSubjectSchema>;
export type BulkCreateExamSubjectInput = z.infer<
  typeof BulkCreateExamSubjectSchema
>;
export type GetExamSubjectsInput = z.infer<typeof GetExamSubjectsSchema>;
export type GetExamSubjectByIdInput = z.infer<typeof GetExamSubjectByIdSchema>;
export type DeleteExamSubjectInput = z.infer<typeof DeleteExamSubjectSchema>;
