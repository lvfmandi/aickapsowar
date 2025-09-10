import axios, { AxiosError } from "axios";

import { BOOK_HOSTEL } from "~/api/urls";
import type { StudentHostel } from "~/lib/store/accomodation.store";

import type { ApiResponse } from "~/lib/types";

export interface BookHostel {
  hostelNo: string;
  roomCode: string;
  floorCode: string;
  spaceCode: string;
}

export const bookHostel = async (
  data: BookHostel
): Promise<ApiResponse<StudentHostel>> => {
  try {
    const response = await axios.post(BOOK_HOSTEL, data, {
      withCredentials: true,
    });

    return { data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ error: string; errors: string }>;
    console.log({ error, err: error.response?.data.error });
    return {
      error:
        error.response?.data?.error ??
        error.response?.data?.errors ??
        "Unexpected error",
    };
  }
};
