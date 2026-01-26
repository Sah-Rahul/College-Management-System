import { z } from "zod";

export const CreateDepartmentSchema = z.object({
  name: z
    .string()
    .min(2, "Department name must be at least 2 characters")
    .max(100, "Department name is too long"),
  code: z
    .string()
    .min(2, "Department code must be at least 2 characters")
    .max(10, "Department code is too long")
    .toUpperCase(),
  description: z.string().max(500).optional(),
  hod: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const UpdateDepartmentSchema = CreateDepartmentSchema.partial();

export const AssignHODSchema = z.object({
  departmentId: z.string().min(1, "Department ID is required"),
  hodId: z.string().min(1, "HOD ID is required"),
});

export const GetDepartmentByIdSchema = z.object({
  id: z.string().min(1, "Department ID is required"),
});

// Type exports
export type CreateDepartmentInput = z.infer<typeof CreateDepartmentSchema>;
export type UpdateDepartmentInput = z.infer<typeof UpdateDepartmentSchema>;
export type AssignHODInput = z.infer<typeof AssignHODSchema>;
export type GetDepartmentByIdInput = z.infer<typeof GetDepartmentByIdSchema>;
