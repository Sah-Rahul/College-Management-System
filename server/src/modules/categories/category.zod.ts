import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(500).optional(),
    icon: z.string().optional(),
    image: z.string().url().optional(),
    parentId: z.string().optional(),
    order: z.number().min(0).optional(),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    description: z.string().max(500).optional(),
    icon: z.string().optional(),
    image: z.string().url().optional(),
    parentId: z.string().optional(),
    order: z.number().min(0).optional(),
    status: z.enum(["active", "inactive", "deleted"]).optional(),
  }),
});

export const getCategoriesQuerySchema = z.object({
  query: z.object({
    parentId: z.string().optional(),
    level: z.string().transform(Number).optional(),
    status: z.string().optional(),
    search: z.string().optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const getCategoryByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
