import axios, { AxiosError } from "axios";

import { GET_RECEIPTS } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { Receipt } from "~/lib/types/finance";

export const getReceipts = async (): Promise<ApiResponse<Receipt[]>> => {
  try {
    const response = await axios.get(GET_RECEIPTS, {
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
