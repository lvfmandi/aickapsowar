import axios, { AxiosError } from "axios";

import { GET_STUDENT_HOSTEL } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { StudentHostel } from "~/lib/store/accomodation.store";

export const getStudentHostel = async (): Promise<
  ApiResponse<StudentHostel>
> => {
  try {
    const response = await axios.get(GET_STUDENT_HOSTEL, {
      withCredentials: true,
    });
    return { data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ error: string; errors: string }>;
    return { error: error.response?.data.error ?? "Something went wrong" };
  }
};
