import { TabsUtils, type TabItem } from "~/components/utils/tabs-utils";
import { SpecialExam } from "~/components/academic-requisitions/special-exam";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { AcedmicLeave } from "~/components/academic-requisitions/academic-leave";
import { Reinstatement } from "~/components/academic-requisitions/reinstatement";
import { ChangeOfProgram } from "~/components/academic-requisitions/change-of-program";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";
import { AcademicRequisition as AcademicRequisitionTable } from "~/components/tables/academic-requisition";

export default function AcademicRequisition() {
  const requisitionTabs: TabItem[] = [
    {
      icon: "logOut",
      value: "academic-leave",
      label: "Academic Leave",
      content: <AcedmicLeave />,
    },
    {
      icon: "repeat",
      value: "reinstatement",
      label: "Reinstatement",
      content: <Reinstatement />,
    },
    {
      icon: "documentText",
      value: "special-exam",
      label: "Special Exam",
      content: <SpecialExam />,
    },
    {
      icon: "swapHorizontal",
      value: "change-of-program",
      label: "Change of Program",
      content: <ChangeOfProgram />,
    },
  ];

  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon={"send"} title="Academic Requisition">
        <TabsUtils data={requisitionTabs} />
        <AcademicRequisitionTable />
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
