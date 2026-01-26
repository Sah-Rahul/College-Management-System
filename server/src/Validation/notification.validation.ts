import { z } from "zod";

export const NotificationTypeEnum = z.enum(["email", "sms", "in_app", "push"]);
export const NotificationStatusEnum = z.enum([
  "pending",
  "sent",
  "failed",
  "read",
]);
export const NotificationTriggerEnum = z.enum([
  "attendance_low",
  "fee_overdue",
  "book_overdue",
  "exam_scheduled",
  "result_published",
  "notice_published",
  "leave_status",
  "promotion",
  "account_blocked",
  "account_unblocked",
  "admission_status",
  "general",
]);

export const CreateNotificationSchema = z.object({
  user: z.string().min(1, "User ID is required"),
  type: NotificationTypeEnum,
  trigger: NotificationTriggerEnum,
  title: z.string().min(1, "Title is required").max(200),
  message: z.string().min(1, "Message is required").max(1000),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const BulkCreateNotificationSchema = z.object({
  notifications: z
    .array(CreateNotificationSchema)
    .min(1, "At least one notification is required"),
});

export const MarkAsReadSchema = z.object({
  notificationId: z.string().min(1, "Notification ID is required"),
});

export const MarkAllAsReadSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export const GetUserNotificationsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  status: NotificationStatusEnum.optional(),
  type: NotificationTypeEnum.optional(),
  trigger: NotificationTriggerEnum.optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const DeleteNotificationSchema = z.object({
  id: z.string().min(1, "Notification ID is required"),
});

export const GetUnreadCountSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

// Type exports
export type CreateNotificationInput = z.infer<typeof CreateNotificationSchema>;
export type BulkCreateNotificationInput = z.infer<
  typeof BulkCreateNotificationSchema
>;
export type MarkAsReadInput = z.infer<typeof MarkAsReadSchema>;
export type MarkAllAsReadInput = z.infer<typeof MarkAllAsReadSchema>;
export type GetUserNotificationsInput = z.infer<
  typeof GetUserNotificationsSchema
>;
export type DeleteNotificationInput = z.infer<typeof DeleteNotificationSchema>;
export type GetUnreadCountInput = z.infer<typeof GetUnreadCountSchema>;
