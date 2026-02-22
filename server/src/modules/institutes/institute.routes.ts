import express from "express";
import * as instituteController from "./institute.controller";
import {
  createInstituteSchema,
  updateInstituteSchema,
  getInstitutesQuerySchema,
} from "./institute.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";

const InstituteRoutes = express.Router();

InstituteRoutes.post(
  "/",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN),
  validate(createInstituteSchema),
  instituteController.createInstitute,
);

InstituteRoutes.get(
  "/",
  validate(getInstitutesQuerySchema),
  instituteController.getAllInstitutes,
);

InstituteRoutes.get("/:id", instituteController.getInstituteById);

InstituteRoutes.put(
  "/:id",
  isAuthenticated,
   authorize(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN),
  validate(updateInstituteSchema),
  instituteController.updateInstitute,
);

InstituteRoutes.delete(
  "/:id",
  isAuthenticated,
   authorize(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN),
  instituteController.deleteInstitute,
);

InstituteRoutes.post(
  "/:id/approve",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN),
  instituteController.approveInstitute,
);

InstituteRoutes.post(
  "/:id/reject",
  isAuthenticated,
   authorize(UserRole.SUPER_ADMIN),
  instituteController.rejectInstitute,
);

InstituteRoutes.post(
  "/:id/suspend",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN),
  instituteController.suspendInstitute,
);

InstituteRoutes.get(
  "/:id/statistics",
  isAuthenticated,
    authorize(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN),
  instituteController.getInstituteStatistics,
);

export default InstituteRoutes;
