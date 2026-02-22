export const CATEGORY_CONSTANTS = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_NESTING_LEVEL: 3,
  DEFAULT_ICON: "default-category-icon.svg",
};

export const CATEGORY_MESSAGES = {
  CREATED: "Category created successfully",
  UPDATED: "Category updated successfully",
  DELETED: "Category deleted successfully",
  NOT_FOUND: "Category not found",
  ALREADY_EXISTS: "Category with this name already exists",
  HAS_COURSES: "Cannot delete category with active courses",
  MAX_LEVEL_REACHED: "Maximum nesting level reached",
};
