import { z } from "zod";

export const LeaveTypeEnum = z.enum([
  "sick",
  "casual",
  "earned",
  "maternity",
  "paternity",
  "unpaid",
  "emergency",
]);
export const LeaveStatusEnum = z.enum([
  "pending",
  "approved",
  "rejected",
  "cancelled",
]);
export const UserTypeEnum = z.enum(["teacher", "staff"]);

export const ApplyLeaveSchema = z
  .object({
    leaveType: LeaveTypeEnum,
    startDate: z.date(),
    endDate: z.date(),
    reason: z
      .string()
      .min(10, "Reason must be at least 10 characters")
      .max(1000),
    attachments: z.array(z.string().url()).optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
  });

export const UpdateLeaveSchema = ApplyLeaveSchema.partial();

export const ReviewLeaveSchema = z.object({
  leaveId: z.string().min(1, "Leave ID is required"),
  status: z.enum(["approved", "rejected"]),
  reviewComments: z.string().max(500).optional(),
});

export const CancelLeaveSchema = z.object({
  leaveId: z.string().min(1, "Leave ID is required"),
});

export const GetUserLeavesSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  status: LeaveStatusEnum.optional(),
  leaveType: LeaveTypeEnum.optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export const GetPendingLeavesSchema = z.object({
  userType: UserTypeEnum.optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const GetLeaveByIdSchema = z.object({
  id: z.string().min(1, "Leave ID is required"),
});

export const GetLeaveBalanceSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  year: z.number().int().optional(),
});

// Type exports
export type ApplyLeaveInput = z.infer<typeof ApplyLeaveSchema>;
export type UpdateLeaveInput = z.infer<typeof UpdateLeaveSchema>;
export type ReviewLeaveInput = z.infer<typeof ReviewLeaveSchema>;
export type CancelLeaveInput = z.infer<typeof CancelLeaveSchema>;
export type GetUserLeavesInput = z.infer<typeof GetUserLeavesSchema>;
export type GetPendingLeavesInput = z.infer<typeof GetPendingLeavesSchema>;
export type GetLeaveByIdInput = z.infer<typeof GetLeaveByIdSchema>;
export type GetLeaveBalanceInput = z.infer<typeof GetLeaveBalanceSchema>;
