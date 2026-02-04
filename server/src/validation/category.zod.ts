import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(2).max(80),
  slug: z.string().min(2).max(80),
  icon: z.string().max(50).optional(),
});

export const UpdateCategorySchema = z.object({
  name: z.string().min(2).max(80).optional(),
  slug: z.string().min(2).max(80).optional(),
  icon: z.string().max(50).optional(),
  isActive: z.boolean().optional(),
});
