import { axiosInstance } from "../axiosInstance";

export const createInstructorRequest = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/instructor/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "InstructorsRequest failed");
  }
};

export const getAllInstructorRequests = async () => {
  try {
    const response = await axiosInstance.get("/instructor/");
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "InstructorsRequest failed");
  }
};

export const getMyInstructorRequest = async () => {
  try {
    const response = await axiosInstance.get("/instructor/my-request");
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "InstructorsRequest failed");
  }
};

export const getInstructorRequestById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/instructor/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "InstructorsRequest failed");
  }
};

export const updateInstructorRequest = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/instructor/${id}`, data);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "InstructorsRequest failed");
  }
};

export const deleteInstructorRequest = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/instructor/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "InstructorsRequest failed");
  }
};

export const reviewInstructorRequest = async (id: string, data: { status: string; remarks?: string }) => {
  try {
    const response = await axiosInstance.post(`/instructor/${id}/review`, data);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "InstructorsRequest failed");
  }
};