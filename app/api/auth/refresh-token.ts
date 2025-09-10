import axios, { AxiosError } from "axios";

import { REFRESH } from "~/api/urls";
import type { ApiResponse } from "~/lib/types";

export const refresh = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await axios.post(REFRESH, {
      withCredentials: true,
    });
    return { data: response.data.success };
  } catch (err) {
    const error = err as AxiosError<{ error: string; errors: string }>;
    return { error: error.response?.data?.error ??
        error.response?.data?.errors ?? "Unexpected error" };
  }
};
