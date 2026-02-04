import { z } from "zod";
import { objectId } from "./common.zod"; 
import { AssignmentSubmissionStatus } from "../@types/enums";

export const CreateAssignmentSubmissionSchema = z.object({
  assignment: objectId,
  course: objectId,

  student: objectId,
  teacher: objectId,

  files: z.array(z.string().url()).optional(),
  textAnswer: z.string().max(20000).optional(),

  submittedAt: z.coerce.date().optional(),
});

export const UpdateAssignmentSubmissionSchema = z.object({
  files: z.array(z.string().url()).optional(),
  textAnswer: z.string().max(20000).optional(),

  status: z.nativeEnum(AssignmentSubmissionStatus).optional(),

  marksObtained: z.number().min(0).max(1000).optional(),
  teacherFeedback: z.string().max(5000).optional(),
  reviewedAt: z.coerce.date().optional(),
});
