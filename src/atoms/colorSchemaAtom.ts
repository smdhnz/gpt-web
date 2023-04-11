import type { ColorScheme } from "@mantine/core";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const colorSchemeAtom = atomWithStorage<ColorScheme>(
  "color-scheme",
  "light"
);

export const toggleColorSchemeAtom = atom(
  (get) => get(colorSchemeAtom),
  (get, set) => {
    const curentColorScheme = get(colorSchemeAtom);
    set(colorSchemeAtom, curentColorScheme === "dark" ? "light" : "dark");
  }
);
