import { axiosInstance } from "./axiosInstance";

export const createCourseAPI = async (
  formData: FormData,
): Promise<{ data: any; error: string | null }> => {
  try {
    const response = await axiosInstance.post("/course/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { data: response.data, error: null };
  } catch (err: any) {
    console.error("Create Course Error:", err);
    const message = err?.response?.data?.message || "Something went wrong";
    return { data: null, error: message };
  }
};

export const updateCourseAPI = async (
  id: string,
  formData: FormData,
): Promise<{ data: any; error: string | null }> => {
  try {
    const response = await axiosInstance.put(`/course/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { data: response.data, error: null };
  } catch (err: any) {
    const message = err?.response?.data?.message || "Something went wrong";
    return { data: null, error: message };
  }
};

export const deleteCourseAPI = async (
  id: string,
): Promise<{ data: any; error: string | null }> => {
  try {
    const response = await axiosInstance.delete(`/course/delete/${id}`);
    return { data: response.data, error: null };
  } catch (err: any) {
    const message = err?.response?.data?.message || "Something went wrong";
    return { data: null, error: message };
  }
};

export const getAllCourseAPI = async (): Promise<{
  data: any;
  error: string | null;
}> => {
  try {
    const response = await axiosInstance.get("/course/");
    return response.data
  } catch (err: any) {
    const message = err?.response?.data?.message || "Something went wrong";
    return { data: null, error: message };
  }
};

export const publishCourseAPI = async (
  id: string,
): Promise<{ data: any; error: string | null }> => {
  try {
    const response = await axiosInstance.patch(`/course/publish/${id}`);
    return { data: response.data, error: null };
  } catch (err: any) {
    const message = err?.response?.data?.message || "Something went wrong";
    return { data: null, error: message };
  }
};

export const unpublishCourseAPI = async (
  id: string,
): Promise<{ data: any; error: string | null }> => {
  try {
    const response = await axiosInstance.patch(`/course/unpublish/${id}`);
    return { data: response.data, error: null };
  } catch (err: any) {
    const message = err?.response?.data?.message || "Something went wrong";
    return { data: null, error: message };
  }
};
