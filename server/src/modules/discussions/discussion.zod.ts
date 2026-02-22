import { z } from "zod";

export const createDiscussionSchema = z.object({
  body: z.object({
    courseId: z.string().min(1),
    title: z.string().min(10).max(200),
    content: z.string().min(20).max(5000),
    category: z.enum([
      "general",
      "question",
      "doubt",
      "assignment",
      "project",
      "suggestion",
      "bug_report",
      "announcement",
    ]),
    tags: z.array(z.string()).max(5).optional(),
  }),
});

export const updateDiscussionSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    title: z.string().min(10).max(200).optional(),
    content: z.string().min(20).max(5000).optional(),
    category: z
      .enum([
        "general",
        "question",
        "doubt",
        "assignment",
        "project",
        "suggestion",
        "bug_report",
        "announcement",
      ])
      .optional(),
    tags: z.array(z.string()).max(5).optional(),
  }),
});

export const createReplySchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    content: z.string().min(10).max(2000),
  }),
});

export const getDiscussionsQuerySchema = z.object({
  query: z.object({
    courseId: z.string().optional(),
    category: z.string().optional(),
    status: z.string().optional(),
    tags: z.string().optional(),
    search: z.string().optional(),
    isPinned: z
      .string()
      .transform((val) => val === "true")
      .optional(),
    isFeatured: z
      .string()
      .transform((val) => val === "true")
      .optional(),
    hasAcceptedAnswer: z
      .string()
      .transform((val) => val === "true")
      .optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const getDiscussionByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const replyIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
    replyId: z.string().min(1),
  }),
});
