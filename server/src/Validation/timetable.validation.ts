import { z } from "zod";

export const DayOfWeekEnum = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]);

export const CreateTimetableSchema = z.object({
  course: z.string().min(1, "Course ID is required"),
  semester: z.number().int().min(1),
  section: z.string().min(1, "Section is required"),
  day: DayOfWeekEnum,
  period: z.number().int().min(1),
  subject: z.string().min(1, "Subject ID is required"),
  teacher: z.string().min(1, "Teacher ID is required"),
  startTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  endTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  room: z.string().optional(),
  academicYear: z
    .string()
    .regex(/^\d{4}-\d{4}$/, "Academic year format should be YYYY-YYYY"),
});

export const UpdateTimetableSchema = CreateTimetableSchema.partial();

export const GetTimetableSchema = z.object({
  course: z.string().optional(),
  semester: z.number().int().min(1).optional(),
  section: z.string().optional(),
  day: DayOfWeekEnum.optional(),
  teacher: z.string().optional(),
  academicYear: z.string().optional(),
});

export const GetStudentTimetableSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  day: DayOfWeekEnum.optional(),
});

export const GetTeacherTimetableSchema = z.object({
  teacherId: z.string().min(1, "Teacher ID is required"),
  day: DayOfWeekEnum.optional(),
});

// Type exports
export type CreateTimetableInput = z.infer<typeof CreateTimetableSchema>;
export type UpdateTimetableInput = z.infer<typeof UpdateTimetableSchema>;
export type GetTimetableInput = z.infer<typeof GetTimetableSchema>;
export type GetStudentTimetableInput = z.infer<
  typeof GetStudentTimetableSchema
>;
export type GetTeacherTimetableInput = z.infer<
  typeof GetTeacherTimetableSchema
>;
