import { z } from "zod";

export const CreateChatSchema = z.object({
  participantId: z.string().min(1, "Participant ID is required"), // For 1-to-1 chat
});

export const CreateGroupChatSchema = z.object({
  groupName: z
    .string()
    .min(2, "Group name must be at least 2 characters")
    .max(100),
  participants: z
    .array(z.string())
    .min(2, "At least 2 participants required for group chat"),
});

export const AddParticipantToGroupSchema = z.object({
  chatId: z.string().min(1, "Chat ID is required"),
  userId: z.string().min(1, "User ID is required"),
});

export const RemoveParticipantFromGroupSchema = z.object({
  chatId: z.string().min(1, "Chat ID is required"),
  userId: z.string().min(1, "User ID is required"),
});

export const UpdateGroupNameSchema = z.object({
  chatId: z.string().min(1, "Chat ID is required"),
  groupName: z
    .string()
    .min(2, "Group name must be at least 2 characters")
    .max(100),
});

export const GetUserChatsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  isGroupChat: z.boolean().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const GetChatByIdSchema = z.object({
  id: z.string().min(1, "Chat ID is required"),
});

export const DeleteChatSchema = z.object({
  chatId: z.string().min(1, "Chat ID is required"),
});

// Type exports
export type CreateChatInput = z.infer<typeof CreateChatSchema>;
export type CreateGroupChatInput = z.infer<typeof CreateGroupChatSchema>;
export type AddParticipantToGroupInput = z.infer<
  typeof AddParticipantToGroupSchema
>;
export type RemoveParticipantFromGroupInput = z.infer<
  typeof RemoveParticipantFromGroupSchema
>;
export type UpdateGroupNameInput = z.infer<typeof UpdateGroupNameSchema>;
export type GetUserChatsInput = z.infer<typeof GetUserChatsSchema>;
export type GetChatByIdInput = z.infer<typeof GetChatByIdSchema>;
export type DeleteChatInput = z.infer<typeof DeleteChatSchema>;
