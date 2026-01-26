import { z } from "zod";
import { AttendanceStatusEnum, AttendanceTypeEnum } from "../enums/enums";

export const MarkAttendanceSchema = z.object({
  user: z.string().min(1, "User ID is required"),
  userType: AttendanceTypeEnum,
  date: z.date(),
  status: AttendanceStatusEnum,

  subject: z.string().optional(),
  period: z.number().int().min(1).max(10).optional(),

  // For teachers and staff
  checkInTime: z.date().optional(),
  checkOutTime: z.date().optional(),

  remarks: z.string().max(500).optional(),
});

export const BulkMarkAttendanceSchema = z.object({
  attendances: z
    .array(MarkAttendanceSchema)
    .min(1, "At least one attendance record is required"),
});

export const GetAttendanceSchema = z.object({
  userId: z.string().optional(),
  userType: AttendanceTypeEnum.optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  subject: z.string().optional(),
  status: AttendanceStatusEnum.optional(),
});

export const GetAttendanceByDateSchema = z.object({
  date: z.date(),
  userType: AttendanceTypeEnum.optional(),
  subject: z.string().optional(),
});

export const GetStudentAttendancePercentageSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  subject: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export const UpdateAttendanceSchema = z.object({
  attendanceId: z.string().min(1, "Attendance ID is required"),
  status: AttendanceStatusEnum,
  remarks: z.string().max(500).optional(),
});

// Type exports
export type MarkAttendanceInput = z.infer<typeof MarkAttendanceSchema>;
export type BulkMarkAttendanceInput = z.infer<typeof BulkMarkAttendanceSchema>;
export type GetAttendanceInput = z.infer<typeof GetAttendanceSchema>;
export type GetAttendanceByDateInput = z.infer<
  typeof GetAttendanceByDateSchema
>;
export type GetStudentAttendancePercentageInput = z.infer<
  typeof GetStudentAttendancePercentageSchema
>;
export type UpdateAttendanceInput = z.infer<typeof UpdateAttendanceSchema>;
