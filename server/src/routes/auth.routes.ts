import { Router } from "express";
import {
  changePassword,
  getMe,
  login,
  logout,
  register,
} from "../controller/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

authRoutes.post("/logout",isAuthenticated, logout);
authRoutes.get("/me",isAuthenticated, getMe);
authRoutes.patch("/change-password",isAuthenticated, changePassword);

export default authRoutes;
