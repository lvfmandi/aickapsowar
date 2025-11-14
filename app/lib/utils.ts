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

type DataToConvert = {
  reason: FormDataEntryValue | null;
  whereTo: FormDataEntryValue | null;
  returnDate: FormDataEntryValue | null;
  returnTime: FormDataEntryValue | null;
  leaveOutDate: FormDataEntryValue | null;
  leaveOutTime: FormDataEntryValue | null;
};

type ConvertedData = {
  returnDate: Date | null;
  returnTime: Date | null;
  leaveOutDate: Date | null;
  leaveOutTime: Date | null;
  reason: FormDataEntryValue | null;
  whereTo: FormDataEntryValue | null;
};

export function convertDatesWithMonthCorrection(
  data: DataToConvert
): ConvertedData {
  const parseDateTimeAndCorrectMonth = (
    dateStr: FormDataEntryValue | null,
    timeStr: FormDataEntryValue | null
  ): Date | null => {
    if (!dateStr || !timeStr) return null;

    const [monthStr, dayStr, yearStr] = (dateStr as string).split("/");
    const correctedMonthIndex = parseInt(monthStr) - 1;

    const correctedDate = new Date(
      Date.UTC(parseInt(yearStr), correctedMonthIndex, parseInt(dayStr))
    );

    const tempTimeParser = new Date(`${dateStr} ${timeStr} UTC`);

    correctedDate.setUTCHours(tempTimeParser.getUTCHours());
    correctedDate.setUTCMinutes(tempTimeParser.getUTCMinutes());

    return correctedDate;
  };

  return {
    reason: data.reason,
    whereTo: data.whereTo,
    leaveOutDate: parseDateTimeAndCorrectMonth(
      data.leaveOutDate,
      data.leaveOutTime
    ),
    leaveOutTime: parseDateTimeAndCorrectMonth(
      data.leaveOutDate,
      data.leaveOutTime
    ),
    returnDate: parseDateTimeAndCorrectMonth(data.returnDate, data.returnTime),
    returnTime: parseDateTimeAndCorrectMonth(data.returnDate, data.returnTime),
  };
}
