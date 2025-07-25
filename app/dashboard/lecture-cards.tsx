import { lectureCards } from "~/lib/dashboard.data";

import { LectureCard } from "~/components/dashboard/lecture-card";
import { DashboardCardSection } from "~/components/dashboard/card-section";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export default function LectureCards() {
  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon={"idCard"} title="Lecture Cards">
        <div className="flex flex-col gap-4 p-4">
          <DashboardCardSection
            items={lectureCards}
            itemComponent={LectureCard}
          />
        </div>
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
