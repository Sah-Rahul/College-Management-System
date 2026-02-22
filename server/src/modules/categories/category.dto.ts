export interface CreateCategoryDTO {
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  parentId?: string;
  order?: number;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  icon?: string;
  image?: string;
  parentId?: string;
  order?: number;
  status?: string;
}

export interface GetCategoriesQueryDTO {
  parentId?: string;
  level?: number;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
