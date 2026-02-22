// import express from "express";
// import * as auditLogController from "./auditLog.controller";
// import { isAuthenticated } from "../../middleware/auth.middleware";
// import { validate } from "../../middleware/validate.middleware";
// import { authorize } from "../../middleware/authorized.middleware";
// import { UserRole } from "../users/user.enums";

// const router = express.Router();

// // Get all audit logs (Admin only)
// router.get(
//   "/",
//   isAuthenticated,
//   authorize(UserRole.SUPER_ADMIN),
//   validate(getAuditLogsQuerySchema),
//   auditLogController.getAllAuditLogs,
// );

// // Get audit log by ID
// router.get(
//   "/:id",
//   isAuthenticated,
//    authorize(UserRole.SUPER_ADMIN),
//   auditLogController.getAuditLogById,
// );

// // Get user's audit logs
// router.get(
//   "/user/:userId",
//   isAuthenticated,
//   authorize(UserRole.SUPER_ADMIN),
//   auditLogController.getUserAuditLogs,
// );

// // Get resource audit logs
// router.get(
//   "/resource/:resourceType/:resourceId",
//   isAuthenticated,
//   authorize(UserRole.SUPER_ADMIN),
//   auditLogController.getResourceAuditLogs,
// );

// // Export audit logs
// router.get(
//   "/export/:format",
//   isAuthenticated,
//   authorize(UserRole.SUPER_ADMIN),
//   auditLogController.exportAuditLogs,
// );

// // Get statistics
// router.get(
//   "/statistics/overview",
//   isAuthenticated,
//   authorize(UserRole.SUPER_ADMIN),
//   auditLogController.getAuditStatistics,
// );

// export default router;
