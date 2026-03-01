import express from "express";
import * as categoryController from "./category.controller";
import { createCategorySchema, updateCategorySchema } from "./category.zod";
import { validate } from "../../middleware/validate.middleware";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";
import { upload } from "../../config/multer.config";

const categoryRoutes = express.Router();

categoryRoutes.use(isAuthenticated);
categoryRoutes.use(authorize(UserRole.INSTRUCTOR));

categoryRoutes.post(
  "/create",
  upload.single("categoryImage"),
  validate(createCategorySchema),
  categoryController.createCategory,
);

categoryRoutes.get("/", categoryController.getAllCategories);

categoryRoutes.get("/:id", categoryController.getCategoryById);

categoryRoutes.get("/slug/:slug", categoryController.getCategoryBySlug);

categoryRoutes.put(
  "/:id",
  upload.single("categoryImage"),
  validate(updateCategorySchema),
  categoryController.updateCategory,
);

categoryRoutes.delete("/:id", categoryController.deleteCategory);

export default categoryRoutes;
