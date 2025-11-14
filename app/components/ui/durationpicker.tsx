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
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

// --- Interfaces and Constants ---

interface DurationPickerProps {
  value?: string;
  onChange?: (duration: string) => void;
}

interface DurationUnit {
  label: string;
  value: "M" | "Y" | "D" | "W" | "WD" | "Q";
}

interface ParsedDuration {
  value: number;
  unit: DurationUnit["value"];
}

// Define available units and their labels
const DURATION_UNITS: DurationUnit[] = [
  { value: "D", label: "Day(s)" },
  { value: "W", label: "Week(s)" },
  { value: "WD", label: "Week Day(s)" },
  { value: "M", label: "Month(s)" },
  { value: "Q", label: "Quatre(s)" },
  { value: "Y", label: "Year(s)" },
];

const DEFAULT_DURATION: ParsedDuration = { value: 1, unit: "D" };

export const DurationPicker: React.FC<DurationPickerProps> = ({
  value,
  onChange,
}) => {
  const parseValue = (val?: string): ParsedDuration => {
    if (!val) return DEFAULT_DURATION;
    const match = val.match(/^(\d+)\s*(\w+)/i);

    if (!match) return DEFAULT_DURATION;

    const parsedValue = parseInt(match[1], 10);
    const parsedUnitText = match[2];

    const validUnit = DURATION_UNITS.find((u) =>
      parsedUnitText.toLowerCase().startsWith(u.value.toLowerCase())
    );

    return {
      value: isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue,
      unit: validUnit ? validUnit.value : "D",
    };
  };

  const initial = parseValue(value);

  const [durationValue, setDurationValue] = React.useState<number>(
    initial.value
  );
  const [durationUnit, setDurationUnit] = React.useState<DurationUnit["value"]>(
    initial.unit
  );
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // Effect to call onChange whenever the value or unit changes
  React.useEffect(() => {
    // Only call onChange if the value is valid (1 or greater)
    if (durationValue > 0) {
      // Use the singular unit value from state
      const combined = `${durationValue} ${durationUnit}`;
      onChange?.(combined);
    }
  }, [durationValue, durationUnit, onChange]);

  // Handle number input change
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Note: e.target.value is always a string from a standard input event
    const newValue = parseInt(e.target.value, 10);
    // Ensure value is a positive integer
    setDurationValue(isNaN(newValue) || newValue < 1 ? 1 : newValue);
  };

  // Find the label (plural/singular display text) for display
  const displayLabel =
    DURATION_UNITS.find((u) => u.value === durationUnit)?.label || "Unit(s)";

  // Handle unit change from the Select
  const handleUnitChange = (newUnit: DurationUnit["value"]) => {
    setDurationUnit(newUnit);
  };

  const handlePopoverToggle = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Popover open={isOpen} onOpenChange={handlePopoverToggle}>
      <PopoverTrigger asChild>
        {/* Button displays the current selected duration */}
        <Button
          variant="outline"
          className="w-full text-start justify-start flex items-center gap-1"
          aria-expanded={isOpen}
          aria-controls="duration-picker-content"
          aria-label={`Current Duration: ${durationValue} ${displayLabel}`}
        >
          <span className="text-primary font-semibold">{durationValue}</span>
          <span className="text-muted-foreground">{displayLabel}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        id="duration-picker-content"
        side="bottom"
        className="flex flex-col sm:flex-row gap-3 p-4 w-64 sm:w-80 shadow-2xl"
      >
        <div className="flex-1">
          <label
            htmlFor="duration-value"
            className="text-xs font-medium text-muted-foreground block mb-1"
          >
            Magnitude
          </label>
          <Input
            id="duration-value"
            type="number"
            min="1"
            value={durationValue}
            onChange={handleValueChange}
            className="w-full text-center"
            placeholder="Duration"
            aria-label="Duration magnitude"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="duration-unit"
            className="text-xs font-medium text-muted-foreground block mb-1"
          >
            Unit
          </label>
          {/* Select component for unit */}
          <Select value={durationUnit} onValueChange={handleUnitChange}>
            <SelectTrigger className="w-full" id="duration-unit">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              {DURATION_UNITS.map((unit) => (
                <SelectItem key={unit.value} value={unit.value}>
                  {unit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
};
