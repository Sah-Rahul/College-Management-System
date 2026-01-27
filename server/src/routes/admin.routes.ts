import { Router } from "express";
import {
  addTeacher,
  addStaff,
  getAllTeacher,
  getAllStaff,
  getAllUsers,
  getUserById,
  blockUser,
  deleteUser,
  promoteTeacher,
  promoteStaff,
  adminRegister,
  adminLogin,
  adminLogout,
  adminMyProfile,
} from "../controller/admin.controller";

import { isAuthenticated } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";
import { upload } from "../middlewares/multer.middleware";

const adminRoutes = Router();

adminRoutes.post("/register", adminRegister);
adminRoutes.post("/login", adminLogin);
adminRoutes.post("/logout", isAdmin, adminLogout);
adminRoutes.get("/me", isAdmin, adminMyProfile);

adminRoutes.post(
  "/add-teacher",
  isAdmin,
  upload.single("profilePicture"),
  addTeacher,
);

adminRoutes.get("/teacher", isAdmin, getAllTeacher);

adminRoutes.patch(
  "/teacher/:id/promote",
  isAuthenticated,
  isAdmin,
  promoteTeacher,
);

adminRoutes.post(
  "/add-staff",
  isAdmin,
  upload.single("profilePicture"),
  addStaff,
);

adminRoutes.get("/staff", isAuthenticated, isAdmin, getAllStaff);

adminRoutes.patch("/staff/:id/promote", isAuthenticated, isAdmin, promoteStaff);

/* ===================== USERS ===================== */

adminRoutes.get("/users", isAuthenticated, isAdmin, getAllUsers);

adminRoutes.get("/users/:id", isAuthenticated, isAdmin, getUserById);

adminRoutes.patch("/users/:id/block", isAuthenticated, isAdmin, blockUser);

adminRoutes.delete("/users/:id", isAuthenticated, isAdmin, deleteUser);

export default adminRoutes;
