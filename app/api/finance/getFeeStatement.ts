import axios, { AxiosError } from "axios";

import { GET_FEE_STATEMENT } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { FeeStatement } from "~/lib/types/finance";

export const getFeeStatement = async (): Promise<
  ApiResponse<FeeStatement[]>
> => {
  try {
    const response = await axios.get(GET_FEE_STATEMENT, {
      withCredentials: true,
    });

    return { data: response.data || [] };
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
