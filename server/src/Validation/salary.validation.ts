import { z } from "zod";
import { EmployeeTypeEnum, SalaryStatusEnum } from "../enums/enums";

export const CreateSalarySchema = z.object({
  employee: z.string().min(1, "Employee ID is required"),
  employeeType: EmployeeTypeEnum,
  month: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Month format should be YYYY-MM"),
  basicSalary: z.number().min(0, "Basic salary cannot be negative"),
  allowances: z.number().min(0).optional(),
  deductions: z.number().min(0).optional(),
  remarks: z.string().max(500).optional(),
});

export const PaySalarySchema = z.object({
  salaryId: z.string().min(1, "Salary ID is required"),
  paymentMode: z.string().min(1, "Payment mode is required"),
  transactionId: z.string().optional(),
  remarks: z.string().max(500).optional(),
});

export const GetEmployeeSalarySchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  month: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/)
    .optional(),
  status: SalaryStatusEnum.optional(),
});

export const GetSalariesByMonthSchema = z.object({
  month: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Month format should be YYYY-MM"),
  employeeType: EmployeeTypeEnum.optional(),
});

// Type exports
export type CreateSalaryInput = z.infer<typeof CreateSalarySchema>;
export type PaySalaryInput = z.infer<typeof PaySalarySchema>;
export type GetEmployeeSalaryInput = z.infer<typeof GetEmployeeSalarySchema>;
export type GetSalariesByMonthInput = z.infer<typeof GetSalariesByMonthSchema>;
