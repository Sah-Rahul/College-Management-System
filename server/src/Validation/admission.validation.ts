import { z } from "zod";
import { AdmissionStatusEnum, QualificationTypeEnum } from "../enums/enums";

export const GenderEnum = z.enum(["male", "female", "other"]);

export const EducationDetailsSchema = z.object({
  qualificationType: QualificationTypeEnum,
  boardUniversity: z.string().min(2, "Board/University name is required"),
  passingYear: z.number().int().min(1950).max(new Date().getFullYear()),
  percentage: z.number().min(0).max(100),
  rollNumber: z.string().optional(),
  certificateUrl: z.string().url().optional(),
});

export const DocumentsSchema = z.object({
  photo: z.string().url().optional(),
  signature: z.string().url().optional(),
  aadharCard: z.string().url().optional(),
  tenthMarksheet: z.string().url().optional(),
  twelfthMarksheet: z.string().url().optional(),
  graduationMarksheet: z.string().url().optional(),
  transferCertificate: z.string().url().optional(),
  casteCertificate: z.string().url().optional(),
  incomeCertificate: z.string().url().optional(),
});

export const CreateAdmissionSchema = z.object({
  applicantName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
  dateOfBirth: z.date(),
  gender: GenderEnum,
  category: z.string().min(1, "Category is required"),
  address: z.string().min(5, "Address is required").max(500),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^[0-9]{6}$/, "Invalid pincode"),
  guardianName: z.string().min(2, "Guardian name is required"),
  guardianPhone: z
    .string()
    .regex(/^[0-9]{10}$/, "Invalid guardian phone number"),
  guardianRelation: z.string().min(2, "Guardian relation is required"),
  courseApplied: z.string().min(1, "Course is required"),
  preferredSection: z.string().optional(),
  educationDetails: z
    .array(EducationDetailsSchema)
    .min(1, "At least one education detail is required"),
  documents: DocumentsSchema.optional(),
});

export const UpdateAdmissionSchema = CreateAdmissionSchema.partial();

export const ReviewAdmissionSchema = z.object({
  admissionId: z.string().min(1, "Admission ID is required"),
  status: z.enum(["approved", "rejected", "waitlisted"]),
  reviewComments: z.string().max(1000).optional(),
  rollNumber: z.string().optional(),
  admissionDate: z.date().optional(),
});

export const GetAdmissionsSchema = z.object({
  status: AdmissionStatusEnum.optional(),
  courseApplied: z.string().optional(),
  appliedDateFrom: z.date().optional(),
  appliedDateTo: z.date().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const GetAdmissionByIdSchema = z.object({
  id: z.string().min(1, "Admission ID is required"),
});

export const GetAdmissionByApplicationNumberSchema = z.object({
  applicationNumber: z.string().min(1, "Application number is required"),
});

export const DeleteAdmissionSchema = z.object({
  id: z.string().min(1, "Admission ID is required"),
});

// Type exports
export type CreateAdmissionInput = z.infer<typeof CreateAdmissionSchema>;
export type UpdateAdmissionInput = z.infer<typeof UpdateAdmissionSchema>;
export type ReviewAdmissionInput = z.infer<typeof ReviewAdmissionSchema>;
export type GetAdmissionsInput = z.infer<typeof GetAdmissionsSchema>;
export type GetAdmissionByIdInput = z.infer<typeof GetAdmissionByIdSchema>;
export type GetAdmissionByApplicationNumberInput = z.infer<
  typeof GetAdmissionByApplicationNumberSchema
>;
export type DeleteAdmissionInput = z.infer<typeof DeleteAdmissionSchema>;
