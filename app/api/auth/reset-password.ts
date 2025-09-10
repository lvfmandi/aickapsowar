import axios, { AxiosError } from "axios";

import { POST_RESET_PASSWORD } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";

interface ResetPasswordRequest {
  token: string;
  password: string;
  studentNo: string;
  confirmPassword: string;
}

export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post(POST_RESET_PASSWORD, data, {
      withCredentials: true,
    });
    return { data: response.data?.success };
  } catch (err) {
    const error = err as AxiosError<{ error: string; errors: string }>;
    return { error: error.response?.data?.error ??
        error.response?.data?.errors ?? "Unexpected error" };
  }
};
