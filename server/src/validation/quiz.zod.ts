import { z } from "zod";
import { objectId } from "./common.zod"; 
import { QuizStatus } from "../@types/enums";

export const CreateQuizSchema = z
  .object({
    course: objectId,
    teacher: objectId,

    title: z.string().min(2).max(200),
    description: z.string().max(10000).optional(),

    status: z.nativeEnum(QuizStatus).optional(),

    durationMinutes: z.number().min(1).max(600),

    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),

    totalMarks: z.number().min(0).max(5000).optional(),
  })
  .refine(
    (data) => {
      if (!data.startTime || !data.endTime) return true;
      return data.endTime > data.startTime;
    },
    { message: "endTime must be greater than startTime" }
  );

export const UpdateQuizSchema = z
  .object({
    title: z.string().min(2).max(200).optional(),
    description: z.string().max(10000).optional(),

    status: z.nativeEnum(QuizStatus).optional(),

    durationMinutes: z.number().min(1).max(600).optional(),

    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),

    totalMarks: z.number().min(0).max(5000).optional(),

    isActive: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (!data.startTime || !data.endTime) return true;
      return data.endTime > data.startTime;
    },
    { message: "endTime must be greater than startTime" }
  );
