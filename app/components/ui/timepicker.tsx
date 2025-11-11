"use client";

import * as React from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";

interface TimePickerProps {
  value?: string; // e.g. "10:30 AM"
  onChange?: (time: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const parseValue = (val?: string) => {
    if (!val) return { hour: "10", minute: "00", period: "AM" };
    const match = val.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
    if (!match) return { hour: "10", minute: "00", period: "AM" };
    return { hour: match[1], minute: match[2], period: match[3].toUpperCase() };
  };

  const initial = parseValue(value);

  const [hour, setHour] = React.useState(initial.hour);
  const [minute, setMinute] = React.useState(initial.minute);
  const [period, setPeriod] = React.useState(initial.period);

  // Update combined value when any part changes
  React.useEffect(() => {
    const combined = `${hour.padStart(2, "0")}:${minute.padStart(
      2,
      "0"
    )} ${period}`;
    onChange?.(combined);
  }, [hour, minute, period, onChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full text-start justify-start">
          {hour}:{minute} {period}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="flex gap-2 p-4">
        {/* Hour Picker */}
        <Select value={hour} onValueChange={setHour}>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem key={i} value={`${i + 1}`}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Minute Picker */}
        <Select value={minute} onValueChange={setMinute}>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 60 }, (_, i) => {
              const val = i.toString().padStart(2, "0");
              return (
                <SelectItem key={i} value={val}>
                  {val}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {/* AM/PM Picker */}
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
};
