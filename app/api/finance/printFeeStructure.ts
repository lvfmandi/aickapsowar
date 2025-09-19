import axios, { AxiosError } from "axios";

import { PRINT_FEE_STRUCTURE } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";

export interface PrintFeeStructure {
  stageCode: string;
  campusCode: string;
}

export const printFeeStructure = async (
  data: PrintFeeStructure
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post(PRINT_FEE_STRUCTURE, data, {
      withCredentials: true,
    });

    return { data: response.data.base64 };
  } catch (err) {
    const error = err as AxiosError<{ error?: string; errors?: string }>;
    return {
      error:
        error.response?.data.error ||
        error.response?.data.errors ||
        "Something went wrong while printing the fee structure",
    };
  }
};
