import { z } from "zod";

export const CreateCategorySchema = z.object({
  categoryName: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be less than 50 characters"), 
});

export const UpdateCategorySchema = z.object({
  categoryName: z.string().min(2).max(50).optional(), 
});


export type UpdateCategoryDTO = z.infer<typeof UpdateCategorySchema>;
export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema>;
