import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middleware";
import {
  createNotice,
  deleteNotice,
  getNoticeById,
  listNotices,
  updateNotice,
} from "../controller/notice.controller";
import { UserRole } from "../@types/enums";

const noticeRoutes = Router();

noticeRoutes.get("/", isAuthenticated, listNotices);

noticeRoutes.get("/:id", isAuthenticated, getNoticeById);

noticeRoutes.post("/", isAuthenticated, authorize(UserRole.MANAGEMENT), createNotice);

noticeRoutes.patch(
  "/:id",
  isAuthenticated,
  authorize(UserRole.MANAGEMENT),
  updateNotice,
);

noticeRoutes.delete(
  "/:id",
  isAuthenticated,
  authorize(UserRole.MANAGEMENT),
  deleteNotice,
);

export default noticeRoutes;
 
 