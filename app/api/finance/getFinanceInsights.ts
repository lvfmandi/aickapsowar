import axios, { AxiosError } from "axios";

import { GET_FEES_INSIGHTS } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { FinanceInsights } from "~/lib/types/finance";

export const getFinanceInsights = async (): Promise<
  ApiResponse<FinanceInsights>
> => {
  try {
    const response = await axios.get(GET_FEES_INSIGHTS, {
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
