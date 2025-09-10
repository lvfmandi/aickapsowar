import axios, { AxiosError } from "axios";

import { GET_STUDENT_UNITS_BY_STAGE } from "~/api/urls";

import type { Unit } from "~/lib/types/units";
import type { ApiResponse } from "~/lib/types";

export interface UnitDTO {
  stageCode: string;
  registerFor: string;
}

export const getStudentUnitsByStage = async ({
  stageCode,
  registerFor,
}: UnitDTO): Promise<ApiResponse<Unit[]>> => {
  try {
    const response = await axios.post(
      GET_STUDENT_UNITS_BY_STAGE,
      { stageCode, registerFor },
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
