import { axiosInstance } from "./axiosInstance";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  user: any;
};

export const loginApi = async (
  url: string,
  { arg }: { arg: LoginPayload }
) => {
  const res = await axiosInstance.post<LoginResponse>(url, arg);
  return res.data;
};
