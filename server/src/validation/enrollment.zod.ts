import { z } from "zod";
import { EnrollmentStatus } from "../@types/enums";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const CreateEnrollmentSchema = z.object({
  student: objectId,
  course: objectId,
});

export const UpdateEnrollmentSchema = z.object({
  status: z.nativeEnum(EnrollmentStatus).optional(),
  progressPercent: z.number().min(0).max(100).optional(),
});
