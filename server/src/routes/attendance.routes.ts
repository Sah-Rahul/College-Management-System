import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../@types/enums";
import {
  getAttendanceById,
  listAttendance,
  markAttendance,
  updateAttendance,
} from "../controller/attendance.controller";

const attendanceRoutes = Router();

attendanceRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.MANAGEMENT, UserRole.TEACHER),
  listAttendance,
);

attendanceRoutes.get("/:id", isAuthenticated, getAttendanceById);

attendanceRoutes.post("/", isAuthenticated, authorize(UserRole.TEACHER), markAttendance);

attendanceRoutes.patch("/:id", isAuthenticated, authorize(UserRole.TEACHER), updateAttendance);

export default attendanceRoutes;


 