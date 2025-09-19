import axios, { AxiosError } from "axios";

import { GET_STUDENT_INFO } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { User } from "~/lib/store/auth.store";

export const getStudentInfo = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.get(GET_STUDENT_INFO, {
      withCredentials: true,
    });
    return { data: response.data };
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
