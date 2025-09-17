import type { StateCreator } from "zustand";

type Themes = "light" | "dark" | "system";

export interface ThemeState {
  theme: Themes;
  setTheme: (value: Themes) => void;
  applyTheme: (theme: string) => void;
}

export const createThemeSlice: StateCreator<ThemeState> = (set, get) => ({
  theme: "system",
  setTheme: (theme) => set(() => ({ theme })),
  applyTheme: (theme = get().theme) => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.remove("dark");
    } else if (theme === "dark") {
      root.classList.add("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  },
});
