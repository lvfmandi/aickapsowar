import axios, { AxiosError } from "axios";

import { REGISTER_UNIT } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { StudentUnit } from "~/lib/types/units";

interface RegisterUnit {
  unitCode: string;
  registerFor: number;
}

export const registerUnit = async ({
  unitCode,
  registerFor,
}: RegisterUnit): Promise<ApiResponse<StudentUnit[]>> => {
  try {
    const response = await axios.post(
      REGISTER_UNIT,
      { unitCode, registerFor },
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
