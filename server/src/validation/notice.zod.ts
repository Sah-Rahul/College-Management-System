import { z } from "zod";
import { objectId } from "./common.zod"; 
import { NoticeAudience } from "../@types/enums";

export const CreateNoticeSchema = z.object({
  title: z.string().min(2).max(200),
  message: z.string().min(2).max(20000),

  createdBy: objectId,

  targetAudience: z.nativeEnum(NoticeAudience).optional(),
  course: objectId.optional(),

  isPinned: z.boolean().optional(),

  publishAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date().optional(),
});

export const UpdateNoticeSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  message: z.string().min(2).max(20000).optional(),

  targetAudience: z.nativeEnum(NoticeAudience).optional(),
  course: objectId.optional(),

  isPinned: z.boolean().optional(),
  isActive: z.boolean().optional(),

  publishAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date().optional(),
});
