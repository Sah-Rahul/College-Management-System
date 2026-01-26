import { z } from "zod";

export const NoticeCategoryEnum = z.enum([
  "general",
  "exam",
  "holiday",
  "event",
  "admission",
  "urgent",
  "academic",
]);
export const NoticeAudienceEnum = z.enum([
  "all",
  "students",
  "teachers",
  "staff",
  "specific_course",
  "specific_department",
]);
export const NoticePriorityEnum = z.enum(["low", "medium", "high", "urgent"]);

export const CreateNoticeSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(300),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000),
  category: NoticeCategoryEnum,
  targetAudience: NoticeAudienceEnum,
  priority: NoticePriorityEnum.default("medium"),
  targetCourses: z.array(z.string()).optional(),
  targetDepartments: z.array(z.string()).optional(),
  targetSemesters: z.array(z.number().int().min(1).max(12)).optional(),
  attachments: z.array(z.string().url()).optional(),
  expiryDate: z.date().optional(),
  isPinned: z.boolean().optional(),
});

export const UpdateNoticeSchema = CreateNoticeSchema.partial();

export const GetNoticesSchema = z.object({
  category: NoticeCategoryEnum.optional(),
  targetAudience: NoticeAudienceEnum.optional(),
  priority: NoticePriorityEnum.optional(),
  isActive: z.boolean().optional(),
  isPinned: z.boolean().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const GetNoticeByIdSchema = z.object({
  id: z.string().min(1, "Notice ID is required"),
});

export const ToggleNoticePinSchema = z.object({
  noticeId: z.string().min(1, "Notice ID is required"),
});

export const DeleteNoticeSchema = z.object({
  id: z.string().min(1, "Notice ID is required"),
});

export const IncrementViewCountSchema = z.object({
  noticeId: z.string().min(1, "Notice ID is required"),
});

// Type exports
export type CreateNoticeInput = z.infer<typeof CreateNoticeSchema>;
export type UpdateNoticeInput = z.infer<typeof UpdateNoticeSchema>;
export type GetNoticesInput = z.infer<typeof GetNoticesSchema>;
export type GetNoticeByIdInput = z.infer<typeof GetNoticeByIdSchema>;
export type ToggleNoticePinInput = z.infer<typeof ToggleNoticePinSchema>;
export type DeleteNoticeInput = z.infer<typeof DeleteNoticeSchema>;
export type IncrementViewCountInput = z.infer<typeof IncrementViewCountSchema>;
