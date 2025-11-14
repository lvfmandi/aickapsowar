import axios, { AxiosError } from "axios";

import type { ApiResponse } from "~/lib/types";

import { POST_GATE_PASS } from "~/api/urls";

export interface PostGatePass {
  purpose: string;
  duration: string;
  leaveOutDate: Date;
  destination: string;
}

export const postGatePass = async (
  data: PostGatePass
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post(POST_GATE_PASS, data, {
      withCredentials: true,
    });
    return { data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ error: string; errors: string }>;
    return {
      error:
        error.response?.data?.error ??
        error.response?.data?.errors ??
        "Unexpected error",
    };
  }
};
