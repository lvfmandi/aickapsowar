import { toast } from "sonner";

import { getStudentStages } from "~/api/units/getStudentStages";

import type { Route } from "./+types/grades";
import { Grades as GradesTable } from "~/components/tables/grades";
import { TabsUtils, type TabItem } from "~/components/utils/tabs-utils";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export const clientLoader = async () => {
  const { data: stages, error } = await getStudentStages();
  if (error) toast.error(error);
  return { stages };
};

export default function Grades({ loaderData }: Route.ComponentProps) {
  const { stages = [] } = loaderData;

  const financeTabs: TabItem[] = [
    {
      icon: "receipt",
      value: "provisionalTranscripts",
      label: "Provisional Transcripts",
      content: <GradesTable data={stages} />,
    },
    {
      icon: "receipt",
      value: "officialTranscripts",
      label: "Offical Transcripts",
      content: <GradesTable data={stages} />,
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
