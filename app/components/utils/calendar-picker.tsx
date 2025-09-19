import { useState } from "react";

import { ChevronDownIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";

export const CalendarPicker = ({ date: defaultDate }: { date: Date }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(defaultDate);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className="w-full justify-between font-normal"
        >
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          disabled
          mode="single"
          selected={date}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
};
