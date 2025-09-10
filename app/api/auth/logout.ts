import axios, { AxiosError } from "axios";

import type { ApiResponse } from "~/lib/types";
import { POST_LOGOUT } from "~/api/urls";

export const logout = async (): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post(POST_LOGOUT, {
      withCredentials: true,
    });
    return { data: response.data.success };
  } catch (err) {
    const error = err as AxiosError<{ error: string; errors: string }>;
    return { error: error.response?.data?.error ??
        error.response?.data?.errors ?? "Unexpected error" };
  }
};
