import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middleware";
import {
  createQuiz,
  deleteQuiz,
  getQuizById,
  listQuizzes,
  updateQuiz,
} from "../controller/quiz.controller";
import { UserRole } from "../@types/enums";

const quizRoutes = Router();

quizRoutes.get("/", isAuthenticated, listQuizzes);

quizRoutes.get("/:id", isAuthenticated, getQuizById);

quizRoutes.post("/", isAuthenticated, authorize(UserRole.TEACHER, UserRole.MANAGEMENT), createQuiz);

quizRoutes.patch("/:id", isAuthenticated, authorize(UserRole.TEACHER, UserRole.MANAGEMENT), updateQuiz);

quizRoutes.delete("/:id", isAuthenticated, authorize(UserRole.TEACHER, UserRole.MANAGEMENT), deleteQuiz);

export default quizRoutes;

 