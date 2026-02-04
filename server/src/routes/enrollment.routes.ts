import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../@types/enums";
import {
  cancelEnrollment,
  enrollStudent,
  listEnrollments,
} from "../controller/enrollment.controller";

const enrollmentRoutes = Router();

enrollmentRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.MANAGEMENT),
  listEnrollments,
);

enrollmentRoutes.post(
  "/",
  isAuthenticated,
  authorize(UserRole.MANAGEMENT),
  enrollStudent,
);

enrollmentRoutes.delete(
  "/",
  isAuthenticated,
  authorize(UserRole.MANAGEMENT),
  cancelEnrollment,
);

export default enrollmentRoutes;
