import { axiosInstance } from "../axiosInstance";

export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "getAllStudents failed"
    );
  }
};