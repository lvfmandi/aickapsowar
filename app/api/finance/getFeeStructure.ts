import axios, { AxiosError } from "axios";

import { GET_FEE_STRUCTURE } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { FeeStructure } from "~/lib/types/finance";

export const getFeeStructure = async (): Promise<
  ApiResponse<FeeStructure[]>
> => {
  try {
    const response = await axios.get(GET_FEE_STRUCTURE, {
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
