import * as v from "valibot";
import { toast } from "sonner";

import { postAcademicLeave } from "~/api/requisition/postAcademicLeaveOut";
import { getStudentRequisitions } from "~/api/requisition/getStudentRequisitions";

import type { Route } from "./+types/student-requisition";
import { TabsUtils, type TabItem } from "~/components/utils/tabs-utils";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { AcedmicLeave } from "~/components/academic-requisitions/academic-leave";
import { StudentRequisitionSchema } from "~/lib/schemas/student-requisition.schema";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";
import { AcademicRequisition as AcademicRequisitionTable } from "~/components/tables/academic-requisition";

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

function convertDatesWithMonthCorrection(data: DataToConvert): ConvertedData {
  const parseDateTimeAndCorrectMonth = (
    dateStr: FormDataEntryValue | null,
    timeStr: FormDataEntryValue | null
  ): Date | null => {
    if (!dateStr || !timeStr) return null;

    const [monthStr, dayStr, yearStr] = (dateStr as string).split("/");
    const correctedMonthIndex = parseInt(monthStr, 10) - 2;

    const correctedDate = new Date(
      Date.UTC(parseInt(yearStr, 10), correctedMonthIndex, parseInt(dayStr, 10))
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

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();

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
      console.log({ data, error });
      if (error) toast.error(error);
      if (data) toast.success("You have successfully sent your leave request");
    }
  } catch (error) {
    toast.error("We couln't validate your data");
  }
};

export const clientLoader = async ({}: Route.ClientLoaderArgs) => {
  const { data, error } = await getStudentRequisitions();

  if (error) {
    toast.error(error);
    return;
  }

  return data;
};

export default function AcademicRequisition({
  loaderData,
}: Route.ComponentProps) {
  console.log({ loaderData });

  const requisitionTabs: TabItem[] = [
    {
      icon: "logOut",
      value: "academic-leave",
      label: "Student leave out",
      content: <AcedmicLeave />,
    },
  ];

  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon={"send"} title="Academic Requisition">
        <TabsUtils data={requisitionTabs} />
        <AcademicRequisitionTable
          data={loaderData?.sort(
            (a, b) =>
              new Date(
                b.leave_Out_Date.year,
                b.leave_Out_Date.month,
                b.leave_Out_Date.day
              ).getTime() -
              new Date(
                a.leave_Out_Date.year,
                a.leave_Out_Date.month,
                a.leave_Out_Date.day
              ).getTime()
          )}
        />
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
