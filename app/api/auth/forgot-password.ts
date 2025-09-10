import axios, { AxiosError } from "axios";

import { POST_FORGOT_PASSWORD } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";

interface ForgotPasswordRequest {
  studentNo: string;
}

export const forgotPassword = async (
  data: ForgotPasswordRequest
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post(POST_FORGOT_PASSWORD, data, {
      withCredentials: true,
    });

    return { data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ error: string; errors: string }>;
    return { error: error.response?.data?.error ??
        error.response?.data?.errors ?? "Unexpected error" };
  }
};
