import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  type AccomodationState,
  createAccomodationSlice,
} from "~/lib/store/accomodation.store";
import { createAuthSlice, type AuthState } from "~/lib/store/auth.store";
import { createUnitSlice, type UnitState } from "~/lib/store/unit.store";
import { createThemeSlice, type ThemeState } from "~/lib/store/theme.store";

export interface AppState
  extends AuthState,
    UnitState,
    ThemeState,
    AccomodationState {}

export const useStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createUnitSlice(...a),
      ...createThemeSlice(...a),
      ...createAccomodationSlice(...a),
    }),
    {
      name: "app-state",
      onRehydrateStorage: () => (state) => {
        // if (state?.theme) state.applyTheme(state.theme);
      },
    }
  )
);
