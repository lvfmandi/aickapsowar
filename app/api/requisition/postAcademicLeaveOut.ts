import axios, { AxiosError } from "axios";

import { POST_ACADEMIC_LEAVE_OUT } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";

export interface PostAcademicLeave {
  reason: string | null;
  whereTo: string | null;
  returnDate: Date | null;
  returnTime: Date | null;
  leaveOutDate: Date | null;
  leaveOutTime: Date | null;
}

export const postAcademicLeave = async (
  data: PostAcademicLeave
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post(POST_ACADEMIC_LEAVE_OUT, data, {
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
