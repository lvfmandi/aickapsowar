import {
  officialGrades,
  provisionalGrades,
} from "~/components/tables/grades/data";
import { Grades as GradesTable } from "~/components/tables/grades";
import { TabsUtils, type TabItem } from "~/components/utils/tabs-utils";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export default function Grades() {
  const financeTabs: TabItem[] = [
    {
      icon: "receipt",
      value: "provisionalTranscripts",
      label: "Provisional Transcripts",
      content: <GradesTable data={provisionalGrades} />,
    },
    {
      icon: "receipt",
      value: "officialTranscripts",
      label: "Offical Transcripts",
      content: <GradesTable data={officialGrades} />,
    },
  ];

  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon={"receipt"} title="Grades">
        <TabsUtils data={financeTabs} />
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
