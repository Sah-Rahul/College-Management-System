import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middleware";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  listCourses,
  updateCourse,
} from "../controller/course.controller";
import { UserRole } from "../@types/enums";

const courseRoutes = Router();

courseRoutes.get("/", isAuthenticated, listCourses);
courseRoutes.get("/:id", isAuthenticated, getCourseById);

courseRoutes.post("/", isAuthenticated, authorize(UserRole.MANAGEMENT), createCourse);

courseRoutes.patch("/:id", isAuthenticated, authorize(UserRole.MANAGEMENT), updateCourse);

courseRoutes.delete("/:id", isAuthenticated, authorize(UserRole.MANAGEMENT), deleteCourse);

 export default courseRoutes