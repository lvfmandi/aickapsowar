import axios, { AxiosError } from "axios";

import { POST_STUDENT_INFO } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";

export interface PostStudentInfo {
  DOB: Date;
  idNo: string;
  email: string;
  gender: number;
  county: string;
  country: string;
  religion: string;
  phoneNumber: string;
  postalAddress: string;
  alternatePhoneNumber: string;
}

export const postStudentInfo = async (
  data: PostStudentInfo
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post(POST_STUDENT_INFO, data, {
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
