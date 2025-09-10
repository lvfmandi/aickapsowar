import axios, { AxiosError } from "axios";

import { PRINT_HOSTEL_INVOICE } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";

export interface PrintHostel {
  hostelNo: string;
  roomNo: string;
  spaceNo: string;
}

export const printHostelInvoice = async (
  data: PrintHostel
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post(PRINT_HOSTEL_INVOICE, data, {
      withCredentials: true,
    });

    return { data: response.data.base64 };
  } catch (err) {
    const error = err as AxiosError<{ error: string; errors: string }>;
    return { error: error.response?.data?.error ??
        error.response?.data?.errors ?? "Unexpected error" };
  }
};
