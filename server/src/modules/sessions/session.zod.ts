import { z } from "zod";

export const createSessionSchema = z.object({
  body: z.object({
    userId: z.string().min(1),
    sessionToken: z.string().min(1),
    refreshToken: z.string().min(1),
    device: z.object({
      type: z.enum(["desktop", "mobile", "tablet", "other"]),
      name: z.string().optional(),
      os: z.string().optional(),
      browser: z.string().optional(),
      version: z.string().optional(),
    }),
    ipAddress: z.string(),
    location: z
      .object({
        country: z.string().optional(),
        city: z.string().optional(),
        region: z.string().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
      })
      .optional(),
    userAgent: z.string(),
    expiresAt: z.string().datetime(),
  }),
});

export const getSessionsQuerySchema = z.object({
  query: z.object({
    userId: z.string().optional(),
    status: z.string().optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const getSessionByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
