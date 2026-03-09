import { axiosInstance } from "../axiosInstance";

export interface ICategory {
  _id: string;
  name: string;
  slug: string; 
  image?: {
    public_url: string;
  };
  status: "active" | "inactive" | "deleted";
  totalCourses: number;
  createdAt: string;
}

export const createCategoryAPI = async (
  formData: FormData,
): Promise<{ data: any; error: string | null }> => {
  try {
    const response = await axiosInstance.post("/category/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

export const getAllCategoryAPI = async (): Promise<{
  data: ICategory[] | null;
  error: string | null;
}> => {
  try {
    const response = await axiosInstance.get("/category/");

    const categories = response.data?.data ?? response.data;
    return { data: categories, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

export const deleteCategoryAPI = async (
  id: string,
): Promise<{ data: any; error: string | null }> => {
  try {
    const response = await axiosInstance.delete(`/category/${id}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

export const updateCategoryAPI = async (
  id: string,
  formData: FormData,
): Promise<{ data: any; error: string | null }> => {
  try {
    const response = await axiosInstance.put(`/category/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

export const getCoursesByCategorySlugAPI = async (
  slug: string,
): Promise<{ data: any; error: string | null }> => {
  try {
    const response = await axiosInstance.get(`/courses?categorySlug=${slug}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};
