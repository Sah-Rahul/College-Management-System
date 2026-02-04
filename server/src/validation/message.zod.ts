import { z } from "zod";
import { objectId } from "./common.zod"; 
import { MessageType } from "../@types/enums";

export const CreateMessageSchema = z
  .object({
    conversation: objectId,
    sender: objectId,

    type: z.nativeEnum(MessageType).optional(),

    text: z.string().max(20000).optional(),
    fileUrl: z.string().url().optional(),
  })
  .refine(
    (data) => {
      if (data.type === MessageType.TEXT) return !!data.text;
      if (data.type === MessageType.FILE || data.type === MessageType.IMAGE)
        return !!data.fileUrl;
      return true;
    },
    { message: "Message must contain text or fileUrl depending on type" }
  );

export const UpdateMessageSchema = z.object({
  readBy: z.array(objectId).optional(),
});
