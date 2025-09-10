import axios, { AxiosError } from "axios";

import { GET_SPACES } from "~/api/urls";
import type { ApiResponse } from "~/lib/types";
import type { Space } from "~/lib/store/accomodation.store";

interface GetSpaces {
  roomCode: string;
}

export const getSpaces = async ({
  roomCode,
}: GetSpaces): Promise<ApiResponse<Space[]>> => {
  try {
    const response = await axios.post(
      GET_SPACES,
      { roomCode },
      {
        withCredentials: true,
      }
    );
    return { data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ error: string; errors: string }>;
    return { error: error.response?.data?.error ??
        error.response?.data?.errors ?? "Unexpected error" };
  }
};
