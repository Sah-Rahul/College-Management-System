import express from "express";
import * as admissionController from "./admission.controller";
import {
  createAdmissionSchema,
  updateAdmissionSchema,
  reviewAdmissionSchema,
  getAdmissionsQuerySchema,
} from "./admission.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";

const admissionRoutes = express.Router();

admissionRoutes.post(
  "/",
  isAuthenticated,
  authorize(UserRole.STUDENT),
  validate(createAdmissionSchema),
  admissionController.createAdmission,
);

admissionRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(getAdmissionsQuerySchema),
  admissionController.getAllAdmissions,
);

admissionRoutes.get(
  "/my-admissions",
  isAuthenticated,
  authorize(UserRole.STUDENT),
  admissionController.getMyAdmissions,
);

admissionRoutes.get("/:id", isAuthenticated, admissionController.getAdmissionById);

admissionRoutes.put(
  "/:id",
  isAuthenticated,
  authorize(UserRole.STUDENT),
  validate(updateAdmissionSchema),
  admissionController.updateAdmission,
);

admissionRoutes.delete(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  admissionController.deleteAdmission,
);

admissionRoutes.post(
  "/:id/review",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(reviewAdmissionSchema),
  admissionController.reviewAdmission,
);

admissionRoutes.post(
  "/:id/withdraw",
  isAuthenticated,
  admissionController.withdrawAdmission,
);

export default admissionRoutes;
