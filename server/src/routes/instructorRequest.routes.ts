import { Router } from "express";
import { UserRole } from "../@types/enums";
import { isAuthenticated } from "../middleware/student.middleware";
import { allowRoles } from "../middleware/allowRoles.middleware";
import {
  createInstructorRequest,
  updateInstructorRequest,
  cancelInstructorRequest,
  approveInstructorRequest,
  rejectInstructorRequest,
  getAllInstructorRequests,
  deleteInstructorRequest,
} from "../controller/instructorRequest.controller";
import { upload } from "../middleware/mullter.middleware";
import { validate } from "../validators/student.validator";
import { CreateInstructorRequestSchema, UpdateInstructorRequestSchema } from "../dto/instructorRequest.dto";

const InstructorRoutes = Router();


InstructorRoutes.post(
  "/request",
  isAuthenticated,
  upload.single("InstructorImage"),
  validate(CreateInstructorRequestSchema),
  createInstructorRequest
);

InstructorRoutes.put(
  "/:id/update",
  isAuthenticated,
  upload.single("InstructorImage"),
  validate(UpdateInstructorRequestSchema),
  updateInstructorRequest
);

InstructorRoutes.patch(
  "/:id/cancel",
  isAuthenticated,
  cancelInstructorRequest
);

InstructorRoutes.patch(
  "/:id/approve",
  isAuthenticated,
  allowRoles(UserRole.ADMIN),
  approveInstructorRequest
);

InstructorRoutes.patch(
  "/:id/reject",
  isAuthenticated,
  allowRoles(UserRole.ADMIN),
  rejectInstructorRequest
);

InstructorRoutes.get(
  "/",
  isAuthenticated,
  allowRoles(UserRole.ADMIN),
  getAllInstructorRequests
);

InstructorRoutes.delete(
  "/:id/delete",
  isAuthenticated,
  allowRoles(UserRole.ADMIN),
  deleteInstructorRequest
);
export default InstructorRoutes;
