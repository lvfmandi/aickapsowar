import axios, { AxiosError } from "axios";

import type { ApiResponse } from "~/lib/types";

import { POST_MEDICAL_LEAVE } from "~/api/urls";

export interface PostMedicalLeave {
  placementHospital: string;
}

export const postMedicalLeave = async (
  data: PostMedicalLeave
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post(POST_MEDICAL_LEAVE, data, {
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
