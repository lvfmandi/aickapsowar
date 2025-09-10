import axios, { AxiosError } from "axios";

import type { ApiResponse } from "~/lib/types";
import { POST_LOGIN } from "~/api/urls";
import type { User } from "~/lib/store/auth.store";

interface LoginRequest {
  studentNo: string;
  password: string;
}

export const login = async (data: LoginRequest): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.post(POST_LOGIN, data, {
      withCredentials: true,
    });
    return { data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ error: string; errors: string }>;
    return { error: error.response?.data?.error ??
        error.response?.data?.errors ?? "Unexpected error" };
  }
};
