import { z } from "zod";
import { FeeStatusEnum, PaymentModeEnum } from "../enums/enums";

export const PaymentHistorySchema = z.object({
  amount: z.number().min(0, "Amount cannot be negative"),
  paymentMode: PaymentModeEnum,
  transactionId: z.string().optional(),
  paymentDate: z.date(),
  receiptNumber: z.string().min(1, "Receipt number is required"),
  remarks: z.string().max(500).optional(),
});

export const CreateFeesSchema = z.object({
  student: z.string().min(1, "Student ID is required"),
  academicYear: z
    .string()
    .regex(/^\d{4}-\d{4}$/, "Academic year format should be YYYY-YYYY"),
  semester: z.number().int().min(1),
  totalFee: z.number().min(0, "Total fee cannot be negative"),
  dueDate: z.date(),
  discount: z.number().min(0).optional(),
});

export const PayFeeSchema = z.object({
  feeId: z.string().min(1, "Fee ID is required"),
  amount: z.number().min(0, "Amount cannot be negative"),
  paymentMode: PaymentModeEnum,
  transactionId: z.string().optional(),
  remarks: z.string().max(500).optional(),
});

export const GetStudentFeesSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  academicYear: z.string().optional(),
  semester: z.number().int().min(1).optional(),
});

export const GetOverdueFeesSchema = z.object({
  date: z.date().optional(),
});

export const UpdateFeeStatusSchema = z.object({
  feeId: z.string().min(1, "Fee ID is required"),
  status: FeeStatusEnum,
});

// Type exports
export type CreateFeesInput = z.infer<typeof CreateFeesSchema>;
export type PayFeeInput = z.infer<typeof PayFeeSchema>;
export type GetStudentFeesInput = z.infer<typeof GetStudentFeesSchema>;
export type GetOverdueFeesInput = z.infer<typeof GetOverdueFeesSchema>;
export type UpdateFeeStatusInput = z.infer<typeof UpdateFeeStatusSchema>;
