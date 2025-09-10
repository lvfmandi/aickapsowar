import axios, { AxiosError } from "axios";

import { GET_FLOORS } from "~/api/urls";
import type { ApiResponse } from "~/lib/types";
import type { Floor } from "~/lib/store/accomodation.store";

interface GetFloors {
  hostelCode: string;
}

export const getFloors = async ({
  hostelCode,
}: GetFloors): Promise<ApiResponse<Floor[]>> => {
  try {
    const response = await axios.post(
      GET_FLOORS,
      { hostelCode },
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
