import axios, { AxiosError } from "axios";

import { GET_STUDENT_UNITS_BY_STAGE } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { StudentUnit } from "~/lib/types/units.d";

export interface UnitDTO {
  stageCode: string;
}

export const getStudentUnitsByStage = async ({
  stageCode,
}: UnitDTO): Promise<ApiResponse<StudentUnit[]>> => {
  try {
    const response = await axios.post(
      GET_STUDENT_UNITS_BY_STAGE,
      { stageCode },
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
