import { fetchUnitsData } from "~/lib/data-helpers/units.data";
import { financeData, lectureCards } from "~/lib/dashboard.data";
import type { ProgramUnit, Stage, StudentUnit } from "~/lib/types/units";

import type { Route } from "./+types/home";
import { useUnits } from "~/components/hooks/use-units";
import { UnitsCard } from "~/components/dashboard/units-card";
import { FinanceCard } from "~/components/dashboard/finance-card";
import { LectureCard } from "~/components/dashboard/lecture-card";
import { DashboardCardSection } from "~/components/dashboard/card-section";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  return await fetchUnitsData();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const {
    stages = [],
    prgmUnits = [],
    stdtUnits = [],
    confirmRegistration = null,
  } = loaderData as {
    stages?: Stage[];
    prgmUnits?: ProgramUnit[];
    stdtUnits?: StudentUnit[];
    confirmRegistration?: Stage;
  };

  const { unitsData } = useUnits({
    stages,
    prgmUnits,
    stdtUnits,
    confirmRegistration,
  });

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
