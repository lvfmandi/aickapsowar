import { financeData, lectureCards, unitsData } from "~/lib/dashboard.data";

import { UnitsCard } from "~/components/dashboard/units-card";
import { FinanceCard } from "~/components/dashboard/finance-card";
import { LectureCard } from "~/components/dashboard/lecture-card";
import { DashboardCardSection } from "~/components/dashboard/card-section";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";

export default function Home() {
  // TODO: fetch the real data
  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon="home" title="Dashboard">
        <div className="flex flex-col gap-4 p-4">
          <DashboardCardSection
            icon={"wallet"}
            title={"Finance"}
            items={financeData}
            itemComponent={FinanceCard}
          />
          <DashboardCardSection
            icon={"layers"}
            title={"Units"}
            items={unitsData}
            itemComponent={UnitsCard}
          />
          <DashboardCardSection
            icon={"idCard"}
            items={lectureCards}
            title={"Lecture Cards"}
            itemComponent={LectureCard}
          />
        </div>
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
