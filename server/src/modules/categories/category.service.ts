import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
  GetCategoriesQueryDTO,
} from "./category.dto";

export const createCategory = async (
  data: CreateCategoryDTO,
  userId: string,
) => {
  // TODO: Create category
};

export const getAllCategories = async (query: GetCategoriesQueryDTO) => {
  // TODO: Get all categories
};

export const getCategoryById = async (categoryId: string) => {
  // TODO: Get category by ID
};

export const getCategoryBySlug = async (slug: string) => {
  // TODO: Get category by slug
};

export const updateCategory = async (
  categoryId: string,
  data: UpdateCategoryDTO,
  userId: string,
) => {
  // TODO: Update category
};

export const deleteCategory = async (categoryId: string, userId: string) => {
  // TODO: Delete category
};

export const getCategoryTree = async () => {
  // TODO: Get hierarchical category tree
};

export const getParentCategories = async () => {
  // TODO: Get only parent categories
};

export const getSubCategories = async (parentId: string) => {
  // TODO: Get sub-categories of a parent
};

export const reorderCategories = async (categoryIds: string[]) => {
  // TODO: Reorder categories
};
