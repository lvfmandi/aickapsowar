import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const REG_FOR_VALUES = [
  "Stage",
  "Special",
  "Exemption",
  "Unit/Subject",
  "Supplimentary",
] as const;

export const [
  REG_FOR_STAGE,
  REG_FOR_SPECIAL,
  REG_FOR_EXEMPTION,
  REG_FOR_UNIT_OR_SUBJECT,
  REG_FOR_SUPPLIMENTARY,
] = REG_FOR_VALUES;

export const UNIT_TABS_SECTIONS = [
  "ALL",
  "NORMAL",
  "SUPPLEMENTARY",
  "RETAKE",
] as const;

export const [ALL, NORMAL, SUPPLEMENTARY, RETAKE] = UNIT_TABS_SECTIONS;
