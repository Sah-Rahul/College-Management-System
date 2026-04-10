import express from "express";
import dependencies from "../Dependencies/dependencies.js";
import authorize from "../../../shared/middlewares/authorize.js";
import authenticate from "../../../shared/middlewares/authenticate.js";
import validate from "../../../shared/middlewares/validate.js";
import requestLogger from "../../../shared/middlewares/requestLogger.js";
import {
  onboardSuperAdminSchema,
  loginSchema,
  registrationSchema,
} from "../validations/authSchema.js";
import { APPLICATION_ROLES } from "../../../shared/constant/role.js";

const authRouter = express.Router();
const { controller } = dependencies;
const authController = controller.authController;

authRouter.post(
  "/onboard-super-admin",
  requestLogger,
  validate(onboardSuperAdminSchema),
  authController.onboardSuperAdmin,
);

authRouter.post(
  "/register",
  requestLogger,
  authenticate,
  authorize([APPLICATION_ROLES.SUPER_ADMIN]),
  validate(registrationSchema),
  authController.register,
);

authRouter.post(
  "/login",
  requestLogger,
  validate(loginSchema),
  authController.login,
);

authRouter.get(
  "/profile",
  requestLogger,
  authenticate,
  authController.getProfile,
);

authRouter.get("/logout", requestLogger, authController.logout);

export default authRouter;
