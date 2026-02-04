import { z } from "zod";
import { objectId } from "./common.zod";

export const CreateAssignmentSchema = z.object({
  course: objectId,
  teacher: objectId,

  title: z.string().min(2).max(200),
  description: z.string().max(10000).optional(),

  dueDate: z.coerce.date().optional(),
  totalMarks: z.number().min(0).max(1000).optional(),

  attachments: z.array(z.string().url()).optional(),
});

export const UpdateAssignmentSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  description: z.string().max(10000).optional(),

  dueDate: z.coerce.date().optional(),
  totalMarks: z.number().min(0).max(1000).optional(),

  attachments: z.array(z.string().url()).optional(),
  isActive: z.boolean().optional(),
});
