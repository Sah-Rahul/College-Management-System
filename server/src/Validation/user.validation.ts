import { z } from "zod";
import {
  AccountStatusEnum,
  BlockReasonEnum,
  GenderEnum,
  UserRoleEnum,
} from "../enums/enums";

export const ParentDetailsSchema = z.object({
  fatherName: z.string().min(1, "Father name is required"),
  motherName: z.string().min(1, "Mother name is required"),
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
  email: z
    .string()
    .email("Invalid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email format is not valid",
    ),
  address: z.string().optional(),
});

export const BlockStatusSchema = z.object({
  isBlocked: z.boolean().default(false),
  reason: BlockReasonEnum.optional(),
  blockedAt: z.date().optional(),
  blockedTill: z.date().optional(),
  blockedBy: z.string().optional(),
  remarks: z.string().optional(),
});

export const StudentDetailsSchema = z.object({
  rollNumber: z.string().min(1, "Roll number is required"),
  department: z.string().min(1, "Department is required"),
  course: z.string().min(1, "Course is required"),
  semester: z.number().int().min(1).max(12),
  section: z.string().min(1).max(2),
  batch: z.string().regex(/^\d{4}-\d{4}$/, "Batch format should be YYYY-YYYY"),
  admissionDate: z.date(),
  parentDetails: ParentDetailsSchema,
  currentAttendancePercentage: z.number().min(0).max(100).optional(),
});

export const TeacherDetailsSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  department: z.string().min(1, "Department is required"),
  designation: z.string().min(1, "Designation is required"),
  qualification: z.string().min(1, "Qualification is required"),
  experience: z.number().int().min(0, "Experience cannot be negative"),
  subjects: z.array(z.string()).optional(),
  joiningDate: z.date(),
});

export const StaffDetailsSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  department: z.string().min(1, "Department is required"),
  designation: z.string().min(1, "Designation is required"),
  shift: z.enum(["morning", "evening"]).optional(),
  joiningDate: z.date(),
});

export const CreateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z
    .string()
    .email("Invalid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email format is not valid",
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: UserRoleEnum,
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number").optional(),
  address: z.string().min(5, "Address is required").optional(),
  gender: GenderEnum,
  dateOfBirth: z.date().optional(),
  bloodGroup: z.string().optional(),
  profilePicture: z.string().url().optional(),
  isActive: z.boolean().default(true),
  accountStatus: AccountStatusEnum.default("active"),
  blockStatus: BlockStatusSchema.optional(),

  studentDetails: StudentDetailsSchema.optional(),
  teacherDetails: TeacherDetailsSchema.optional(),
  staffDetails: StaffDetailsSchema.optional(),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const BlockUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  reason: BlockReasonEnum,
  blockedTill: z.date(),
  remarks: z.string().optional(),
});

export const UnblockUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  remarks: z.string().optional(),
});

// Type exports
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type BlockUserInput = z.infer<typeof BlockUserSchema>;
export type UnblockUserInput = z.infer<typeof UnblockUserSchema>;
