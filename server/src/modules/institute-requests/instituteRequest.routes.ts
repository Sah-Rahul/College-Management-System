import express from "express";
import * as instituteRequestController from "./instituteRequest.controller";
import {
  createInstituteRequestSchema,
  updateInstituteRequestSchema,
  reviewInstituteRequestSchema,
} from "./instituteRequest.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";
import { upload } from "../../config/multer.config";
import { INSTITUTE_REQUEST_CONSTANTS } from "./instituteRequest.constants";

const InstituteRequestRoutes = express.Router();

InstituteRequestRoutes.post(
  "/create",
  isAuthenticated,
  upload.array("documents", INSTITUTE_REQUEST_CONSTANTS.MAX_DOCUMENTS),
  validate(createInstituteRequestSchema),
  instituteRequestController.createInstituteRequest,
);

InstituteRequestRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN), 
  instituteRequestController.getAllInstituteRequests,
);

InstituteRequestRoutes.get(
  "/my-request",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN), 
  instituteRequestController.getMyInstituteRequest,
);

InstituteRequestRoutes.get(
  "/:id",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN),
  instituteRequestController.getInstituteRequestById,
);

InstituteRequestRoutes.put(
  "/:id/update",
  isAuthenticated,
  upload.array("documents", INSTITUTE_REQUEST_CONSTANTS.MAX_DOCUMENTS),
  validate(updateInstituteRequestSchema),
  authorize(UserRole.INSTITUTE_ADMIN),
  instituteRequestController.updateInstituteRequest,
);

InstituteRequestRoutes.delete(
  "/:id",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN),
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
