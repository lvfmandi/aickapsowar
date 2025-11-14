import { toast } from "sonner";

import { getPlacementHospitals } from "~/api/requisition/getPlacementHospitals";
import { getStudentRequisitions } from "~/api/requisition/getStudentRequisitions";

import {
  GatePass,
  gatePassAction,
} from "~/components/academic-requisitions/gate-pass";
import {
  MedicalLeave,
  medicalLeaveAction,
} from "~/components/academic-requisitions/medical-leave";
import type { Route } from "./+types/student-requisition";
import {
  AcademicLeave,
  academicLeaveOutAction,
} from "~/components/academic-requisitions/academic-leave";
import { TabsUtils, type TabItem } from "~/components/utils/tabs-utils";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();
  const formType = formData.get("formType");

  const clientActions = {
    gatePass: gatePassAction,
    medicalLeave: medicalLeaveAction,
    academicLeaveOut: academicLeaveOutAction,
  };

  console.log({ formType });

  clientActions[formType as keyof typeof clientActions]({ formData });
};

export const clientLoader = async ({}: Route.ClientLoaderArgs) => {
  const [
    { data: studentRequisitions, error: studentRequisitionsError },
    { data: placementHospitals, error: placementHospitalsError },
  ] = await Promise.all([getStudentRequisitions(), getPlacementHospitals()]);

  if (studentRequisitionsError || placementHospitalsError) {
    toast.error(studentRequisitionsError || placementHospitalsError);
    return;
  }

  return { studentRequisitions, placementHospitals };
};

export default function AcademicRequisition({
  loaderData,
}: Route.ComponentProps) {
  const { studentRequisitions, placementHospitals } = loaderData || {};

  const getTimestamp = (date: { year: number; month: number; day: number }) =>
    new Date(date.year, date.month - 1, date.day).getTime();

  const leaveOutList = studentRequisitions?.leaveOutList
    ?.sort((a, b) => (b.leave_out_Tme < a.leave_out_Tme ? 1 : -1))
    .sort(
      (a, b) => getTimestamp(b.leave_Out_Date) - getTimestamp(a.leave_Out_Date)
    );

  const requisitionTabs: TabItem[] = [
    {
      icon: "logOut",
      value: "academic-leave",
      label: "Student leave out",
      content: <AcademicLeave leaveOutList={leaveOutList} />,
    },
    {
      icon: "doorOpen",
      value: "gate-pass",
      label: "Gate Pass",
      content: <GatePass gatePasses={studentRequisitions?.gatePassList} />,
    },
    {
      icon: "medical",
      value: "medical-leave",
      label: "Medical Leave",
      content: (
        <MedicalLeave
          placementHospitals={placementHospitals}
          medicalLeave={studentRequisitions?.medicalLeaveList}
        />
      ),
    },
  ];

  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon={"send"} title="Academic Requisition">
        <TabsUtils data={requisitionTabs} />
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
