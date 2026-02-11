import { Router } from "express";

import { UserRole } from "../@types/enums";
import { isAuthenticated } from "../middleware/student.middleware";
import { allowRoles } from "../middleware/allowRoles.middleware";
import { upload } from "../middleware/mullter.middleware";
import { validate } from "../validators/student.validator";
import { 
  CreateCourseSchema,
  UpdateCourseSchema,
} from "../dto/course.dto";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  publishCourse,
  unpublishCourse,
  updateCourse,
} from "../controller/course.controller";

const courseRoutes = Router();

courseRoutes.post(
  "/create",
  isAuthenticated,
  allowRoles(UserRole.INSTRUCTOR, UserRole.INSTITUTE),
  upload.single("thumbnail"),
  validate(CreateCourseSchema),
  createCourse,
);

courseRoutes.get("/",isAuthenticated, allowRoles(UserRole.INSTRUCTOR, UserRole.INSTITUTE),getAllCourses);

courseRoutes.put(
  "/:id",
  isAuthenticated,
  allowRoles(UserRole.INSTRUCTOR, UserRole.INSTITUTE),
  upload.single("thumbnail"),
  validate(UpdateCourseSchema),
  updateCourse,
);

courseRoutes.delete(
  "/:id",
  isAuthenticated,
  allowRoles(UserRole.INSTRUCTOR, UserRole.INSTITUTE),
  deleteCourse,
);

courseRoutes.patch(
  "/:id/publish",
  isAuthenticated,
  allowRoles(UserRole.INSTRUCTOR, UserRole.INSTITUTE),
  publishCourse,
);

courseRoutes.patch(
  "/:id/unpublish",
  isAuthenticated,
  allowRoles(UserRole.INSTRUCTOR, UserRole.INSTITUTE),
  unpublishCourse,
);

export default courseRoutes;
