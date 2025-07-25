import { timetableCards } from "~/lib/dashboard.data";

import { TimetableCard } from "~/components/dashboard/timetable-card";
import { DashboardCardSection } from "~/components/dashboard/card-section";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export default function LectureCards() {
  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon={"calendar"} title="Timetable">
        <div className="flex flex-col gap-4 p-4">
          <DashboardCardSection
            items={timetableCards}
            itemComponent={TimetableCard}
          />
        </div>
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
