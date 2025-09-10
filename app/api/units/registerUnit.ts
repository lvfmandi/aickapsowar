import axios, { AxiosError } from "axios";

import { REGISTER_UNIT } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { UnitDTO } from "~/api/units/getStudentUnitsByStage";

export const registerUnit = async ({
  stageCode,
  registerFor,
}: UnitDTO): Promise<ApiResponse<boolean>> => {
  try {
    const response = await axios.post(
      REGISTER_UNIT,
      { stageCode, registerFor },
      {
        withCredentials: true,
      }
    );

    return { data: response.data || false };
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
