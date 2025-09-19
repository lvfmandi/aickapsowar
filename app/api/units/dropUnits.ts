import axios, { AxiosError } from "axios";

import { DROP_UNIT } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { StudentUnit } from "~/lib/types/units.d";

interface DropUnit {
  unitCode: string;
}

export const dropUnit = async ({
  unitCode,
}: DropUnit): Promise<ApiResponse<StudentUnit[]>> => {
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
