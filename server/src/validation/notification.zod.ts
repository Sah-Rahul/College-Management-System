import { z } from "zod";
import { objectId } from "./common.zod";
import { NotificationType } from "../@types/enums";

export const CreateNotificationSchema = z.object({
  user: objectId,

  type: z.nativeEnum(NotificationType).optional(),

  title: z.string().min(2).max(200),
  body: z.string().min(2).max(5000),

  entityId: objectId.optional(),

  isRead: z.boolean().optional(),

  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateNotificationSchema = z.object({
  isRead: z.boolean().optional(),
});
