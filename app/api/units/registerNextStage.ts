import axios, { AxiosError } from "axios";

import { REGISTER_NEXT_STAGE } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";

export const registerNextStage = async (): Promise<ApiResponse<boolean>> => {
  console.log("here");

  try {
    const response = await axios.post(
      REGISTER_NEXT_STAGE,
      {},
      {
        withCredentials: true,
      }
    );

    return { data: response.data || false };
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
