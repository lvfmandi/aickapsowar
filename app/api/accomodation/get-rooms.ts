import axios, { AxiosError } from "axios";

import { GET_ROOMS } from "~/api/urls";
import type { ApiResponse } from "~/lib/types";
import type { Room } from "~/lib/store/accomodation.store";

interface GetRooms {
  floorCode: string;
}

export const getRooms = async ({
  floorCode,
}: GetRooms): Promise<ApiResponse<Room[]>> => {
  try {
    const response = await axios.post(
      GET_ROOMS,
      { floorCode },
      {
        withCredentials: true,
      }
    );
    return { data: response.data || [] };
  } catch (err) {
    const error = err as AxiosError<{ error: string; errors: string }>;
    return { error: error.response?.data?.error ??
        error.response?.data?.errors ?? "Unexpected error" };
  }
};
