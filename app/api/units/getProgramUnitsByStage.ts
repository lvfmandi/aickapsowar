import axios, { AxiosError } from "axios";

import { GET_PROGRAM_UNITS_BY_STAGE } from "~/api/urls";

import type { ProgramUnit } from "~/lib/types/units";
import type { ApiResponse } from "~/lib/types";

interface ProgramUnitsByStage {
  currentStage: string;
}

export const getProgramUnitsByStage = async ({
  currentStage,
}: ProgramUnitsByStage): Promise<ApiResponse<ProgramUnit[]>> => {
  try {
    const response = await axios.post(
      GET_PROGRAM_UNITS_BY_STAGE,
      { currentStage },
      {
        withCredentials: true,
      }
    );

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
