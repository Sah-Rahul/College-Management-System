import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../@types/enums";
import {
  getSubmissionById,
  listSubmissions,
  submitAssignment,
  updateSubmission,
} from "../controller/assignmentSubmission.controller";

const assignmentSubmissionRoutes = Router();

assignmentSubmissionRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.MANAGEMENT, UserRole.TEACHER),
  listSubmissions,
);

assignmentSubmissionRoutes.get("/:id", isAuthenticated, getSubmissionById);

assignmentSubmissionRoutes.post("/", isAuthenticated, authorize(UserRole.STUDENT), submitAssignment);

assignmentSubmissionRoutes.patch("/:id", isAuthenticated, authorize(UserRole.STUDENT), updateSubmission);

export default assignmentSubmissionRoutes;


 
 