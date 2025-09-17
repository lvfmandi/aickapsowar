import axios, { AxiosError } from "axios";

import { GET_PROVISIONAL_RESULTS } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";

export interface GetProvisionalResults {
  stage: string;
}

export const getProvisionalResults = async ({
  stage,
}: GetProvisionalResults): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post(
      GET_PROVISIONAL_RESULTS,
      {
        stage,
      },
      {
        withCredentials: true,
      }
    );

    return { data: response.data.base64 || "" };
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
