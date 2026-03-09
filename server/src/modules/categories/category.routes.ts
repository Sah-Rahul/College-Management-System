import express from "express";
import * as categoryController from "./category.controller";
import { createCategorySchema, updateCategorySchema } from "./category.zod";
import { validate } from "../../middleware/validate.middleware";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";
import { upload } from "../../config/multer.config";

const categoryRoutes = express.Router();

categoryRoutes.post(
  "/create",
  isAuthenticated,
  upload.single("categoryImage"),
  authorize(
    UserRole.INSTRUCTOR,
    UserRole.SUPER_ADMIN,
    UserRole.INSTITUTE_ADMIN,
  ),
  validate(createCategorySchema),
  categoryController.createCategory,
);

categoryRoutes.get("/", categoryController.getAllCategories);

categoryRoutes.get("/:id", categoryController.getCategoryById);

categoryRoutes.get("/slug/:slug", categoryController.getCategoryBySlug);

categoryRoutes.put(
  "/:id",
  isAuthenticated,
  authorize(
    UserRole.INSTRUCTOR,
    UserRole.SUPER_ADMIN,
    UserRole.INSTITUTE_ADMIN,
  ),
  upload.single("categoryImage"),
  validate(updateCategorySchema),
  categoryController.updateCategory,
);

categoryRoutes.delete(
  "/:id",
  isAuthenticated,
  authorize(
    UserRole.INSTRUCTOR,
    UserRole.SUPER_ADMIN,
    UserRole.INSTITUTE_ADMIN,
  ),
  categoryController.deleteCategory,
);

export default categoryRoutes;
