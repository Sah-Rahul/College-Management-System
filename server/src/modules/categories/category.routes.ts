import express from "express";
import * as categoryController from "./category.controller";
import {
  createCategorySchema,
  updateCategorySchema,
  getCategoriesQuerySchema,
  getCategoryByIdSchema,
} from "./category.zod";
import { validate } from "../../middleware/validate.middleware";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";

const categoryRoutes = express.Router();

 
categoryRoutes.post(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(createCategorySchema),
  categoryController.createCategory,
);

 
categoryRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN,UserRole.INSTRUCTOR),
  validate(getCategoriesQuerySchema),
  categoryController.getAllCategories,
);

 
  authorize(UserRole.INSTITUTE_ADMIN,UserRole.INSTRUCTOR),
categoryRoutes.get("/tree",isAuthenticated, categoryController.getCategoryTree);

 
  authorize(UserRole.INSTITUTE_ADMIN,UserRole.INSTRUCTOR),
categoryRoutes.get("/parents",isAuthenticated, categoryController.getParentCategories);

 
categoryRoutes.get(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN,UserRole.INSTRUCTOR,UserRole.STUDENT),
  validate(getCategoryByIdSchema),
  categoryController.getCategoryById,
);

(authorize(UserRole.INSTITUTE_ADMIN, UserRole.INSTRUCTOR),
  categoryRoutes.get(
    "/slug/:slug",
    isAuthenticated,
    categoryController.getCategoryBySlug,
  ));

categoryRoutes.get(
  "/:id/subcategories",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.INSTRUCTOR),
  validate(getCategoryByIdSchema),
  categoryController.getSubCategories,
);

categoryRoutes.put(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(updateCategorySchema),
  categoryController.updateCategory,
);

categoryRoutes.delete(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(getCategoryByIdSchema),
  categoryController.deleteCategory,
);

categoryRoutes.post(
  "/reorder",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  categoryController.reorderCategories,
);

export default categoryRoutes;
