import axios, { AxiosError } from "axios";

import { PRINT_FEE_STATEMENT } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";

export const printFeeStatement = async (): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.get(PRINT_FEE_STATEMENT, {
      withCredentials: true,
    });

  return {data: response.data.base64};
  } catch (err) {
    const error = err as AxiosError<{ error?: string; errors?: string }>;
    return {
      error:
        error.response?.data.error ||
        error.response?.data.errors ||
        "Something went wrong while printing the receipt",
    };
  }
};
