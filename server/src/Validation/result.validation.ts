import { z } from "zod";

export const GradeEnum = z.enum(["A+", "A", "B+", "B", "C", "D", "F"]);

export const CreateResultSchema = z.object({
  student: z.string().min(1, "Student ID is required"),
  exam: z.string().min(1, "Exam ID is required"),
  subject: z.string().min(1, "Subject ID is required"),
  marksObtained: z.number().min(0, "Marks cannot be negative"),
  totalMarks: z.number().min(0, "Total marks cannot be negative"),
  remarks: z.string().max(500).optional(),
});

export const BulkCreateResultSchema = z.object({
  results: z
    .array(CreateResultSchema)
    .min(1, "At least one result is required"),
});

export const UpdateResultSchema = z.object({
  resultId: z.string().min(1, "Result ID is required"),
  marksObtained: z.number().min(0),
  remarks: z.string().max(500).optional(),
});

export const GetStudentResultsSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  examId: z.string().optional(),
  subjectId: z.string().optional(),
});

export const GetExamResultsSchema = z.object({
  examId: z.string().min(1, "Exam ID is required"),
  subjectId: z.string().optional(),
});

// Type exports
export type CreateResultInput = z.infer<typeof CreateResultSchema>;
export type BulkCreateResultInput = z.infer<typeof BulkCreateResultSchema>;
export type UpdateResultInput = z.infer<typeof UpdateResultSchema>;
export type GetStudentResultsInput = z.infer<typeof GetStudentResultsSchema>;
export type GetExamResultsInput = z.infer<typeof GetExamResultsSchema>;
