import axios, { AxiosError } from "axios";

import { GET_PLACEMENT_HOSPITALS } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { PlacementHospital } from "~/lib/types/requisitions";

export const getPlacementHospitals = async (): Promise<
  ApiResponse<PlacementHospital[]>
> => {
  try {
    const response = await axios.get(GET_PLACEMENT_HOSPITALS, {
      withCredentials: true,
    });

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
