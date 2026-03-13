import { axiosInstance } from "../axiosInstance";

export const InstructorsRequestApi = async () => {
  try {
    const response = await axiosInstance.get("/instructor");
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "InstructorsRequest failed"
    );
  }
};