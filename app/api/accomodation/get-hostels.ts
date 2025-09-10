import axios, { AxiosError } from "axios";

import { GET_HOSTELS } from "~/api/urls";
import type { ApiResponse } from "~/lib/types";
import type { Hostel } from "~/lib/store/accomodation.store";

export const getHostels = async (): Promise<ApiResponse<Hostel[]>> => {
  try {
    const response = await axios.get(GET_HOSTELS, {
      withCredentials: true,
    });

    return { data: response.data as Hostel[] };
  } catch (err) {
    const error = err as AxiosError<{ error: string; errors: string }>;
    return { error: error.response?.data?.error ??
        error.response?.data?.errors ?? "Unexpected error" };
  }
};
