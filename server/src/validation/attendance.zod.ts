import { z } from "zod";
import { objectId } from "./common.zod"; 
import { AttendanceStatus } from "../@types/enums";

export const CreateAttendanceSchema = z.object({
  student: objectId,
  course: objectId,

  date: z.coerce.date(),
  status: z.nativeEnum(AttendanceStatus),

  markedBy: objectId,

  note: z.string().max(500).optional(),
});

export const UpdateAttendanceSchema = z.object({
  status: z.nativeEnum(AttendanceStatus).optional(),
  note: z.string().max(500).optional(),
});
