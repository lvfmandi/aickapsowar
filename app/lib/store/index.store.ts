export interface AppState extends AuthState, AccomodationState {}

import { create } from "zustand";

import {
  type AccomodationState,
  createAccomodationSlice,
} from "~/lib/store/accomodation.store";
import { createAuthSlice, type AuthState } from "~/lib/store/auth.store";

export const useStore = create<AppState>((...a) => ({
  ...createAuthSlice(...a),
  ...createAccomodationSlice(...a),
}));
