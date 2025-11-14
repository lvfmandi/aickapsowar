import * as v from "valibot";

import { toast } from "sonner";
import { useState } from "react";
import { Form } from "react-router";

import { postGatePass } from "~/api/requisition/postGatePass";

import { type GatePassRequisition } from "~/lib/types/requisitions";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import Icon from "~/components/utils/icons";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { GatePassTable } from "~/components/tables/gate-pass";
import { DurationPicker } from "~/components/ui/durationpicker";
import { GatePassSchema } from "~/lib/schemas/gate-pass.schema";

export const gatePassAction = async ({ formData }: { formData: FormData }) => {
  const data = {
    purpose: formData.get("purpose"),
    duration: formData.get("duration"),
    destination: formData.get("destination"),
    leaveOutDate: new Date(formData.get("leaveOutDate") as string),
  };

  console.log({ data });

  try {
    const safeParse = v.safeParse(GatePassSchema, data);

    if (!safeParse.success) {
      toast.error(safeParse.issues[0].message);
      return { issues: safeParse.issues };
    }

    if (safeParse.success) {
      const { data, error } = await postGatePass(safeParse.output);
      if (error) toast.error(error);
      if (data)
        toast.success("You have successfully sent your medical leave request");
    }
  } catch (error) {
    toast.error("We couldn't validate your data");
  }
};

export const GatePass = ({
  gatePasses = [],
}: {
  gatePasses?: GatePassRequisition[];
}) => {
  const [duration, setDuration] = useState("1 D");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [leaveOutDate, setLeaveOutDate] = useState<Date | undefined>(undefined);

  return (
    <div>
      <Form
        method={"post"}
        name="academicLeaveOut"
        className="py-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]"
      >
        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            1. Leave Date
          </h4>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
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
                  setCalendarOpen(false);
                  setLeaveOutDate(newDate);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            2. Purpose
          </h4>
          <Input name="purpose" placeholder="Purpose" />
        </div>

        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            3. Destination
          </h4>
          <Input name="destination" placeholder="Destination" />
        </div>

        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            4. Duration
          </h4>
          <DurationPicker
            value={duration}
            onChange={(duration) => setDuration(duration)}
          />
        </div>
        <div className="space-y-4">
          <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
            5. Submit Requistion
          </h4>
          <Button className="w-full">Submit Requisition</Button>
        </div>
        <Input name="duration" type="hidden" value={duration} />
        <Input name="formType" type="hidden" value={"gatePass"} />
        <Input
          type="hidden"
          name="leaveOutDate"
          value={leaveOutDate?.toLocaleDateString()}
        />
      </Form>
      <GatePassTable data={gatePasses} />
    </div>
  );
};
