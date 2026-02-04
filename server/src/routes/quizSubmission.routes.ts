import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../@types/enums";
import {
  getMySubmission,
  listSubmissionsByQuiz,
  startQuiz,
  submitQuiz,
} from "../controller/quizSubmission.controller";

const quizSubmissionRoutes = Router();

quizSubmissionRoutes.post(
  "/start",
  isAuthenticated,
  authorize(UserRole.STUDENT),
  startQuiz,
);

quizSubmissionRoutes.post(
  "/submit",
  isAuthenticated,
  authorize(UserRole.STUDENT),
  submitQuiz,
);

quizSubmissionRoutes.get(
  "/me/:quizId",
  isAuthenticated,
  authorize(UserRole.STUDENT),
  getMySubmission,
);

quizSubmissionRoutes.get(
  "/quiz/:quizId",
  isAuthenticated,
  authorize(UserRole.TEACHER, UserRole.ADMIN, UserRole.MANAGEMENT),
  listSubmissionsByQuiz,
);

export default quizSubmissionRoutes;
