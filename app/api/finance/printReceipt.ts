import axios, { AxiosError } from "axios";

import { PRINT_RECEIPT } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";

interface PrintReceipt {
  receiptNo: string;
}

export const printReceipt = async (
  printReceiptData: PrintReceipt
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post(PRINT_RECEIPT, printReceiptData, {
      withCredentials: true,
    });

    return { data: response.data.base64 };
  } catch (err) {
    const error = err as AxiosError<{ error?: string; errors?: string }>;
    return {
      error:
        error.response?.data.error ||
        error.response?.data.errors ||
        "Something went wrong while printing the receipt",
    };
  }
};
