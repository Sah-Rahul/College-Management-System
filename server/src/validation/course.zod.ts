import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const CreateCourseSchema = z.object({
  title: z.string().min(2).max(120),
  slug: z.string().min(2).max(140),
  description: z.string().max(5000).optional(),

  category: objectId,
  teacher: objectId,

  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  price: z.number().min(0).optional(),

  thumbnailUrl: z.string().url().optional(),
});

export const UpdateCourseSchema = z.object({
  title: z.string().min(2).max(120).optional(),
  slug: z.string().min(2).max(140).optional(),
  description: z.string().max(5000).optional(),

  category: objectId.optional(),
  teacher: objectId.optional(),

  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  price: z.number().min(0).optional(),

  thumbnailUrl: z.string().url().optional(),
  isPublished: z.boolean().optional(),
  isActive: z.boolean().optional(),
});
