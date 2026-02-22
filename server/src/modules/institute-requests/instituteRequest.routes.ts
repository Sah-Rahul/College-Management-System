import express from "express";
import * as instituteRequestController from "./instituteRequest.controller";
import {
  createInstituteRequestSchema,
  updateInstituteRequestSchema,
  reviewInstituteRequestSchema,
  getInstituteRequestsQuerySchema,
} from "./instituteRequest.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";

const InstituteRequestRoutes = express.Router();

InstituteRequestRoutes.post(
  "/",
  isAuthenticated,
  validate(createInstituteRequestSchema),
  instituteRequestController.createInstituteRequest,
);

InstituteRequestRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN),
  validate(getInstituteRequestsQuerySchema),
  instituteRequestController.getAllInstituteRequests,
);

InstituteRequestRoutes.get(
  "/my-request",
  isAuthenticated,
  instituteRequestController.getMyInstituteRequest,
);

InstituteRequestRoutes.get(
  "/:id",
  isAuthenticated,
  instituteRequestController.getInstituteRequestById,
);

InstituteRequestRoutes.put(
  "/:id",
  isAuthenticated,
  validate(updateInstituteRequestSchema),
  instituteRequestController.updateInstituteRequest,
);

InstituteRequestRoutes.delete(
  "/:id",
  isAuthenticated,
  instituteRequestController.deleteInstituteRequest,
);

InstituteRequestRoutes.post(
  "/:id/review",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN),
  validate(reviewInstituteRequestSchema),
  instituteRequestController.reviewInstituteRequest,
);

export default InstituteRequestRoutes;
