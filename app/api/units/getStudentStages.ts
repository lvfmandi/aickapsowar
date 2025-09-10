import axios, { AxiosError } from "axios";

import { GET_STUDENT_STAGES } from "~/api/urls";

import type { Stage } from "~/lib/types/units";
import type { ApiResponse } from "~/lib/types";

export const getStudentStages = async (): Promise<ApiResponse<Stage[]>> => {
  try {
    const response = await axios.get(GET_STUDENT_STAGES, {
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
