import { z } from "zod";
import { StaffDepartment, StaffShift } from "../models/staff.mode";

const StaffDepartmentEnum = z.nativeEnum(StaffDepartment);
const StaffShiftEnum = z.nativeEnum(StaffShift);

export const CreateStaffSchema = z.object({
  name: z.string().min(2, "Name is required"),
  employeeId: z.string().min(3, "Employee ID is required"),
  department: z.nativeEnum(StaffDepartment),
  designation: z.string().min(2, "Designation is required"),
  shift: z.nativeEnum(StaffShift).optional().default(StaffShift.MORNING),
  salary: z.coerce.number().min(0, "Salary must be positive"),
  joiningDate: z.preprocess((val) => new Date(val as string), z.date()),
  exitDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional(),
  ),
  isActive: z
    .preprocess((val) => val === "true" || val === true, z.boolean())
    .optional()
    .default(true),
  profilePicture: z.string().optional(),
});

export const UpdateStaffSchema = z.object({
  designation: z.string().min(2).optional(),
  department: StaffDepartmentEnum.optional(),
  shift: StaffShiftEnum.optional(),
  salary: z.number().min(0).optional(),
  joiningDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional(),
  ),
  exitDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional(),
  ),
  isActive: z.boolean().optional(),
  profilePicture: z.string().url().optional(),
});
