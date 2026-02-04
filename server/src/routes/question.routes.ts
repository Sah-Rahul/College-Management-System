import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middleware";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  listQuestions,
  updateQuestion,
} from "../controller/question.controller";
import { UserRole } from "../@types/enums";

const questionRoutes = Router();

questionRoutes.get("/", isAuthenticated, listQuestions);

questionRoutes.get("/:id", isAuthenticated, getQuestionById);

questionRoutes.post("/", isAuthenticated, authorize(UserRole.TEACHER), createQuestion);

questionRoutes.patch("/:id", isAuthenticated, authorize(UserRole.TEACHER), updateQuestion);

questionRoutes.delete("/:id", isAuthenticated, authorize(UserRole.TEACHER), deleteQuestion);

export default questionRoutes;
 