import * as v from "valibot";
import { toast } from "sonner";
import { useState } from "react";
import { Form } from "react-router";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import Icon from "~/components/utils/icons";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { TimePicker } from "~/components/ui/timepicker";
import { AcademicRequisition as AcademicRequisitionTable } from "~/components/tables/academic-requisition";

import { convertDatesWithMonthCorrection } from "~/lib/utils";
import type { LeaveOutRequisition } from "~/lib/types/requisitions";
import { StudentRequisitionSchema } from "~/lib/schemas/student-requisition.schema";

import { postAcademicLeave } from "~/api/requisition/postAcademicLeaveOut";

export const academicLeaveOutAction = async ({
  formData,
}: {
  formData: FormData;
}) => {
  const data = convertDatesWithMonthCorrection({
    reason: formData.get("reason"),
    whereTo: formData.get("whereTo"),
    returnDate: formData.get("returnDate"),
    returnTime: formData.get("returnTime"),
    leaveOutDate: formData.get("leaveOutDate"),
    leaveOutTime: formData.get("leaveOutTime"),
  });

  try {
    const safeParse = v.safeParse(StudentRequisitionSchema, data);

    if (!safeParse.success) {
      toast.error(safeParse.issues[0].message);
      return { issues: safeParse.issues };
    }

    if (safeParse.success) {
      const { data, error } = await postAcademicLeave(safeParse.output);
      if (error) toast.error(error);
      if (data) toast.success("You have successfully sent your leave request");
    }
  } catch (error) {
    toast.error("We couln't validate your data");
  }
};

export const AcademicLeave = ({
  leaveOutList,
}: {
  leaveOutList?: LeaveOutRequisition[];
}) => {
  const [calendar1Open, setCalendar1Open] = useState(false);
  const [calendar2Open, setCalendar2Open] = useState(false);

  const [leaveOutTime, setLeaveOutTime] = useState<string | undefined>(
    "7:00 AM"
  );
  const [leaveOutDate, setLeaveOutDate] = useState<Date | undefined>(undefined);

  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [returnTime, setReturnTime] = useState<string | undefined>("7:00 AM");

  return (
    <div>
      <Form
        method={"post"}
        name="academicLeaveOut"
        className="py-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]"
      >
        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            1. Leave Out Date
          </h4>
          <Popover open={calendar1Open} onOpenChange={setCalendar1Open}>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className="w-full justify-between font-normal"
              >
                {leaveOutDate
                  ? leaveOutDate.toLocaleDateString()
                  : "Select date"}
                <Icon name="chevronDown" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={leaveOutDate}
                disabled={{
                  before: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate()
                  ),
                }}
                captionLayout="dropdown"
                onSelect={(newDate) => {
                  setCalendar1Open(false);
                  setLeaveOutDate(newDate);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            2. Leave Out Time
          </h4>
          <TimePicker value={leaveOutTime} onChange={setLeaveOutTime} />
        </div>
        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            3. Return Date
          </h4>
          <Popover open={calendar2Open} onOpenChange={setCalendar2Open}>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className="w-full justify-between font-normal"
              >
                {returnDate ? returnDate.toLocaleDateString() : "Select date"}
                <Icon name="chevronDown" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={returnDate}
                disabled={{
                  before: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate()
                  ),
                }}
                captionLayout="dropdown"
                onSelect={(newDate) => {
                  setReturnDate(newDate);
                  setCalendar2Open(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            4. Return Time
          </h4>
          <TimePicker value={returnTime} onChange={setReturnTime} />
        </div>
        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            5. Where To
          </h4>
          <Input name="whereTo" placeholder="Other Reason" />
        </div>
        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            6. Reason
          </h4>
          <Input name="reason" placeholder="Other Reason" />
        </div>
        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            7. Submit Requistion
          </h4>
          <Button className="w-full">Submit Requisition</Button>
        </div>
        <Input
          type="hidden"
          name="returnDate"
          value={returnDate?.toLocaleDateString()}
        />
        <Input
          type="hidden"
          name="leaveOutDate"
          value={leaveOutDate?.toLocaleDateString()}
        />
        <Input type="hidden" name="returnTime" value={returnTime} />
        <Input type="hidden" name="leaveOutTime" value={leaveOutTime} />
        <Input type="hidden" name="formType" value={"academicLeaveOut"} />
      </Form>
      <AcademicRequisitionTable data={leaveOutList} />
    </div>
  );
};
