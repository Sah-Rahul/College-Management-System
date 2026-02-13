import { axiosInstance } from "./axiosInstance";

export const createCategoryAPI = async (
  formData: FormData,
): Promise<{ data: any; error: string | null }> => {
  try {
    const response = await axiosInstance.post("/category/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { data: response.data, error: null };
  } catch (err: any) {
    console.error("Create Category Error:", err);
    const message = err?.response?.data?.message || "Something went wrong";
    return { data: null, error: message };
  }
};

export const getAllCategoryAPI = async (): Promise<{
  data: any;
  error: string | null;
}> => {
  try {
    const response = await axiosInstance.get("/category/all");
    return { data: response.data, error: null };
  } catch (err: any) {
    console.error("Get Categories Error:", err);
    const message = err?.response?.data?.message || "Something went wrong";
    return { data: null, error: message };
  }
};

export const updateCategoryAPI = async (id: string, formData: FormData) => {
  try {
    const response = await axiosInstance.put(
      `/category/update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return { data: response.data, error: null };
  } catch (err: any) {
    const message = err?.response?.data?.message || "Something went wrong";
    return { data: null, error: message };
  }
};

export const deleteCategoryAPI = async (
  id: string,
): Promise<{ data: any; error: string | null }> => {
  try {
    const response = await axiosInstance.delete(`/category/delete/${id}`);
    return { data: response.data, error: null };
  } catch (err: any) {
    console.error("Delete Category Error:", err);
    const message = err?.response?.data?.message || "Something went wrong";
    return { data: null, error: message };
  }
};
