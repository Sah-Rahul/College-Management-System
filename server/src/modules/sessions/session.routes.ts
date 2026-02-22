import express from "express";
import * as sessionController from "./session.controller";
import { getSessionsQuerySchema, getSessionByIdSchema } from "./session.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";

const sessionRoutes = express.Router();

 
sessionRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN),
  validate(getSessionsQuerySchema),
  sessionController.getAllSessions,
);

 
sessionRoutes.get("/my-sessions", isAuthenticated, sessionController.getMySessions);

 
sessionRoutes.get("/active", isAuthenticated, sessionController.getActiveSessions);

 
sessionRoutes.get(
  "/:id",
  isAuthenticated,
  validate(getSessionByIdSchema),
  sessionController.getSessionById,
);

 
sessionRoutes.post("/refresh", sessionController.refreshSession);

 
sessionRoutes.delete(
  "/:id",
  isAuthenticated,
  validate(getSessionByIdSchema),
  sessionController.revokeSession,
);

 
sessionRoutes.delete("/revoke-all", isAuthenticated, sessionController.revokeAllSessions);

export default sessionRoutes;
