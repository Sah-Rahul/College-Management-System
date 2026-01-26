import { z } from "zod";

export const MessageSenderEnum = z.enum(["user", "support", "system"]);
export const MessageTypeEnum = z.enum(["text", "image", "file", "system"]);

export const SendMessageSchema = z.object({
  chatId: z.string().min(1, "Chat ID is required"),
  message: z.string().min(1, "Message is required").max(2000),
  messageType: MessageTypeEnum.default("text"),
  attachments: z.array(z.string().url()).optional(),
});

export const EditMessageSchema = z.object({
  messageId: z.string().min(1, "Message ID is required"),
  message: z.string().min(1, "Message is required").max(2000),
});

export const DeleteMessageSchema = z.object({
  messageId: z.string().min(1, "Message ID is required"),
});

export const MarkMessageAsReadSchema = z.object({
  messageId: z.string().min(1, "Message ID is required"),
});

export const MarkAllMessagesAsReadSchema = z.object({
  chatId: z.string().min(1, "Chat ID is required"),
});

export const GetChatMessagesSchema = z.object({
  chatId: z.string().min(1, "Chat ID is required"),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  before: z.string().optional(),
  after: z.string().optional(),
});

export const GetUnreadMessagesCountSchema = z.object({
  chatId: z.string().min(1, "Chat ID is required"),
  userId: z.string().min(1, "User ID is required"),
});

// Type exports
export type SendMessageInput = z.infer<typeof SendMessageSchema>;
export type EditMessageInput = z.infer<typeof EditMessageSchema>;
export type DeleteMessageInput = z.infer<typeof DeleteMessageSchema>;
export type MarkMessageAsReadInput = z.infer<typeof MarkMessageAsReadSchema>;
export type MarkAllMessagesAsReadInput = z.infer<
  typeof MarkAllMessagesAsReadSchema
>;
export type GetChatMessagesInput = z.infer<typeof GetChatMessagesSchema>;
export type GetUnreadMessagesCountInput = z.infer<
  typeof GetUnreadMessagesCountSchema
>;
