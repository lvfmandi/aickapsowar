import axios, { AxiosError } from "axios";

import { CONFIRM_SEMESTER_REGISTRATION } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { Stage } from "~/lib/types/units";

export const confirmSemesterRegistration = async (): Promise<
  ApiResponse<Stage>
> => {
  try {
    const response = await axios.get(CONFIRM_SEMESTER_REGISTRATION, {
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
