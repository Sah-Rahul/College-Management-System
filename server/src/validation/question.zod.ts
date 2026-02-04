import { z } from "zod";
import { objectId } from "./common.zod";
import { QuizQuestionType } from "../@types/enums";

const optionSchema = z.object({
  text: z.string().min(1).max(5000),
});

export const CreateQuestionSchema = z
  .object({
    quiz: objectId,
    course: objectId,

    type: z.nativeEnum(QuizQuestionType).optional(),

    questionText: z.string().min(2).max(20000),

    options: z.array(optionSchema).optional(),

    correctAnswer: z.string().max(5000).optional(),

    marks: z.number().min(0).max(1000).optional(),

    order: z.number().min(1).max(10000).optional(),
  })
  .refine(
    (data) => {
      const type = data.type ?? QuizQuestionType.MCQ;

      if (type === QuizQuestionType.MCQ) {
        return (data.options?.length ?? 0) >= 2 && !!data.correctAnswer;
      }

      return true;
    },
    { message: "MCQ must have at least 2 options and a correctAnswer" },
  );

export const UpdateQuestionSchema = z
  .object({
    type: z.nativeEnum(QuizQuestionType).optional(),
    questionText: z.string().min(2).max(20000).optional(),

    options: z.array(optionSchema).optional(),
    correctAnswer: z.string().max(5000).optional(),

    marks: z.number().min(0).max(1000).optional(),
    order: z.number().min(1).max(10000).optional(),

    isActive: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (!data.type) return true;

      if (data.type === QuizQuestionType.MCQ) { 
        return true;
      }

      return true;
    },
    { message: "Invalid question update" },
  );
