import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    type: z.enum(["course", "institute"]),
    courseId: z.string().optional(),
    instituteId: z.string().optional(),
    rating: z.number().min(1).max(5),
    title: z.string().min(5).max(100).optional(),
    comment: z.string().min(10).max(1000),
    pros: z.array(z.string()).max(5).optional(),
    cons: z.array(z.string()).max(5).optional(),
  }),
});

export const updateReviewSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    title: z.string().min(5).max(100).optional(),
    comment: z.string().min(10).max(1000).optional(),
    pros: z.array(z.string()).max(5).optional(),
    cons: z.array(z.string()).max(5).optional(),
  }),
});

export const getReviewsQuerySchema = z.object({
  query: z.object({
    type: z.enum(["course", "institute"]).optional(),
    courseId: z.string().optional(),
    instituteId: z.string().optional(),
    userId: z.string().optional(),
    status: z.string().optional(),
    rating: z.string().transform(Number).optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
