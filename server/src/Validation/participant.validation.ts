import { z } from "zod";

export const UserOnlineStatusEnum = z.enum(["online", "offline", "away"]);

export const UpdateOnlineStatusSchema = z.object({
  chatId: z.string().min(1, "Chat ID is required"),
  status: UserOnlineStatusEnum,
});

export const GetChatParticipantsSchema = z.object({
  chatId: z.string().min(1, "Chat ID is required"),
});

export const GetOnlineParticipantsSchema = z.object({
  chatId: z.string().min(1, "Chat ID is required"),
});

// Type exports
export type UpdateOnlineStatusInput = z.infer<typeof UpdateOnlineStatusSchema>;
export type GetChatParticipantsInput = z.infer<
  typeof GetChatParticipantsSchema
>;
export type GetOnlineParticipantsInput = z.infer<
  typeof GetOnlineParticipantsSchema
>;
