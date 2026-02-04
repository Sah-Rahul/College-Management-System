import { z } from "zod";
import { objectId } from "./common.zod"; 
import { ConversationType } from "../@types/enums";

export const CreateConversationSchema = z.object({
  type: z.nativeEnum(ConversationType).optional(),

  participants: z.array(objectId).min(2, "At least 2 participants required"),

  course: objectId.optional(),
});

export const UpdateConversationSchema = z.object({
  lastMessage: objectId.optional(),
  isActive: z.boolean().optional(),
});
