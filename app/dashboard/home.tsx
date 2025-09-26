import { toast } from "sonner";

import { getFinanceInsights } from "~/api/finance/getFinanceInsights";

import type { FinanceInsights } from "~/lib/types/finance";
import { defaultFeesInsights } from "~/lib/dashboard.data";
import { fetchUnitsData } from "~/lib/data-helpers/units.data";
import type { ProgramUnit, Stage, StudentUnit } from "~/lib/types/units.d";

import type { Route } from "./+types/home";
import { useCards } from "~/components/hooks/use-cards";
import { useUnits } from "~/components/hooks/use-units";
import { useFinance } from "~/components/hooks/use-finance";
import { UnitsCard } from "~/components/dashboard/units-card";
import { FinanceCard } from "~/components/dashboard/finance-card";
import { LectureCard } from "~/components/dashboard/lecture-card";
import { DashboardCardSection } from "~/components/dashboard/card-section";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const [unitsInfo, { data: financeInsights, error: financeInsightsError }] =
    await Promise.all([fetchUnitsData(), getFinanceInsights()]);

  if (financeInsightsError) toast.error(financeInsightsError);

  return { unitsInfo, financeInsights };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { unitsInfo, financeInsights = defaultFeesInsights } = loaderData as {
    unitsInfo: {
      stages: Stage[];
      prgmUnits: ProgramUnit[];
      stdtUnits: StudentUnit[];
      confirmRegistration: Stage | null;
    };
    financeInsights: FinanceInsights;
  };
  const { convertFeesToFinanceData } = useFinance();
  const financeData = convertFeesToFinanceData(financeInsights);

  const { lectureCards } = useCards();
  const { unitsData } = useUnits(unitsInfo);

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
