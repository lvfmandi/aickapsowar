import axios, { AxiosError } from "axios";

import { GET_CARDS } from "~/api/urls";

import type { ApiResponse } from "~/lib/types";
import type { CardType } from "~/lib/types/cards.d";

interface GetCards {
  cardType: CardType;
}

export const getCard = async (
  getCards: GetCards
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post(GET_CARDS, getCards, {
      withCredentials: true,
    });

    return { data: response.data.base64 };
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
