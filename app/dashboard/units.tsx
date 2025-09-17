import { useStore } from "~/lib/store/index.store";
import { fetchUnitsData } from "~/lib/data-helpers/units.data";
import type { Stage, ProgramUnit, StudentUnit } from "~/lib/types/units";

import type { Route } from "./+types/units";
import { useUnits } from "~/components/hooks/use-units";
import { TabsUtils } from "~/components/utils/tabs-utils";
import { UnitsCard } from "~/components/dashboard/units-card";
import { DashboardCardSection } from "~/components/dashboard/card-section";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  return await fetchUnitsData();
}

export default function Units({ loaderData }: Route.ComponentProps) {
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

  const { currentUnitTab } = useStore((state) => state);
  const { unitTabs, unitsData, handleOnTabChange } = useUnits({
    stages,
    prgmUnits,
    stdtUnits,
    confirmRegistration,
  });

  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon="layers" title="Units">
        <div className="flex flex-col gap-4 p-4">
          <DashboardCardSection
            itemComponent={UnitsCard}
            items={unitsData.slice(0, 2)}
          />
        </div>
        <TabsUtils
          data={unitTabs}
          initialValue={currentUnitTab}
          handleOnChange={handleOnTabChange}
        />
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
