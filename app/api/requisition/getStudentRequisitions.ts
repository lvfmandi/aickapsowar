import axios, { AxiosError } from "axios";

import { GET_STUDENT_REQUISITIONS } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { AcademicRequisition } from "~/lib/types/requisitions";

export const getStudentRequisitions = async (): Promise<
  ApiResponse<AcademicRequisition[]>
> => {
  try {
    const response = await axios.get(GET_STUDENT_REQUISITIONS, {
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
