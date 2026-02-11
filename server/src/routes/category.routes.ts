import { Router } from "express"; 
import { CreateCategorySchema, UpdateCategorySchema } from "../dto/category.dto";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from "../controller/category.controller";
import { isAuthenticated } from "../middleware/student.middleware";
import { allowRoles } from "../middleware/allowRoles.middleware";
import { UserRole } from "../@types/enums"; 
import { upload } from "../middleware/mullter.middleware";
import { validate } from "../validators/student.validator";

const categoryRoutes = Router();

categoryRoutes.post(
  "/create",
  isAuthenticated,
  allowRoles(UserRole.ADMIN),
  upload.single("categoryImage"),  
  validate(CreateCategorySchema),  
  createCategory
);

categoryRoutes.put(
  "/update/:id",
  isAuthenticated,
  allowRoles(UserRole.ADMIN),
  upload.single("categoryImage"),
  validate(UpdateCategorySchema),
  updateCategory
);

categoryRoutes.delete(
  "/delete/:id",
  isAuthenticated,
  allowRoles(UserRole.ADMIN),
  deleteCategory
);

categoryRoutes.get(
  "/all",
  isAuthenticated,
  allowRoles(UserRole.ADMIN),
  getAllCategories
);

export default categoryRoutes;
