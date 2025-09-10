import axios, { AxiosError } from "axios";

import { DROP_UNIT } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";

interface DropUnit {
  unitCode: string;
}

export const dropUnit = async ({
  unitCode,
}: DropUnit): Promise<ApiResponse<boolean>> => {
  try {
    const response = await axios.post(
      DROP_UNIT,
      { unitCode },
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
