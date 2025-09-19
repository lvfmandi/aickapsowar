import axios, { AxiosError } from "axios";

import { GET_CURRENT_SEMESTER } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { Semester } from "~/lib/types/units.d";

export const getCurrentSemester = async (): Promise<ApiResponse<Semester>> => {
  try {
    const response = await axios.get(GET_CURRENT_SEMESTER, {
      withCredentials: true,
    });

    return { data: response.data || null };
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
