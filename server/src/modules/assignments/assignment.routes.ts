import express from "express";
import * as assignmentController from "./assignment.controller";
import {
  createAssignmentSchema,
  updateAssignmentSchema,
  submitAssignmentSchema,
  gradeAssignmentSchema,
  peerReviewSchema,
  requestResubmissionSchema,
  getAssignmentsQuerySchema,
  getSubmissionsQuerySchema,
  getAssignmentByIdSchema,
  deleteAssignmentSchema,
} from "./assignment.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";

const assignmentRoutes = express.Router();

assignmentRoutes.post(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.INSTITUTE_ADMIN),
  validate(createAssignmentSchema),
  assignmentController.createAssignment,
);

assignmentRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.STUDENT),
  validate(getAssignmentsQuerySchema),
  assignmentController.getAllAssignments,
);

assignmentRoutes.get(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.STUDENT),
  validate(getAssignmentByIdSchema),
  assignmentController.getAssignmentById,
);

assignmentRoutes.put(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.INSTITUTE_ADMIN),
  validate(updateAssignmentSchema),
  assignmentController.updateAssignment,
);

assignmentRoutes.delete(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.INSTITUTE_ADMIN),
  validate(deleteAssignmentSchema),
  assignmentController.deleteAssignment,
);

assignmentRoutes.patch(
  "/:id/publish",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.INSTITUTE_ADMIN),
  validate(getAssignmentByIdSchema),
  assignmentController.publishAssignment,
);

assignmentRoutes.get(
  "/:id/statistics",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(getAssignmentByIdSchema),
  assignmentController.getAssignmentStatistics,
);

assignmentRoutes.get(
  "/:id/export",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  assignmentController.exportSubmissions,
);

assignmentRoutes.post(
  "/:id/submit",
  isAuthenticated,
  authorize(UserRole.STUDENT),
  validate(submitAssignmentSchema),
  assignmentController.submitAssignment,
);

assignmentRoutes.get(
  "/:id/my-submission",
  isAuthenticated,
  authorize(UserRole.STUDENT),
  assignmentController.getUserSubmission,
);

assignmentRoutes.get(
  "/:id/submissions",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.INSTITUTE_ADMIN),
  validate(getSubmissionsQuerySchema),
  assignmentController.getAllSubmissions,
);

assignmentRoutes.get(
  "/submissions/:submissionId",
  isAuthenticated,
  assignmentController.getSubmissionById,
);

assignmentRoutes.post(
  "/submissions/:submissionId/grade",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.INSTITUTE_ADMIN),
  validate(gradeAssignmentSchema),
  assignmentController.gradeSubmission,
);

assignmentRoutes.post(
  "/submissions/:submissionId/peer-review",
  isAuthenticated,
  authorize(UserRole.STUDENT),
  validate(peerReviewSchema),
  assignmentController.submitPeerReview,
);

assignmentRoutes.post(
  "/submissions/:submissionId/request-resubmission",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(requestResubmissionSchema),
  assignmentController.requestResubmission,
);

assignmentRoutes.post(
  "/submissions/:submissionId/plagiarism-check",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  assignmentController.checkPlagiarism,
);

export default assignmentRoutes;
