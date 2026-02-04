import { z } from "zod";
import { objectId } from "./common.zod";

const answerSchema = z
  .object({
    question: objectId,

    selectedOption: z.string().max(5000).optional(),
    textAnswer: z.string().max(20000).optional(),

    marksObtained: z.number().min(0).max(1000).optional(),
  })
  .refine(
    (a) => !!a.selectedOption || !!a.textAnswer,
    { message: "Each answer must have selectedOption or textAnswer" }
  );

export const CreateQuizSubmissionSchema = z.object({
  quiz: objectId,
  course: objectId,

  student: objectId,

  answers: z.array(answerSchema).optional(),

  startedAt: z.coerce.date().optional(),
  submittedAt: z.coerce.date().optional(),

  score: z.number().min(0).max(100000).optional(),
});

export const UpdateQuizSubmissionSchema = z.object({
  answers: z.array(answerSchema).optional(),

  submittedAt: z.coerce.date().optional(),

  score: z.number().min(0).max(100000).optional(),

  isEvaluated: z.boolean().optional(),
});
