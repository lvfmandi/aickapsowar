import { unitsData } from "~/lib/dashboard.data";

import {
  normalUnits,
  retakeUnits,
  supplementaryUnits,
} from "~/components/tables/units/data";
import UnitsProvider from "~/components/hooks/units";
import { UnitsTable } from "~/components/tables/units";
import { UnitsCard } from "~/components/dashboard/units-card";
import { TabsUtils, type TabItem } from "~/components/utils/tabs-utils";
import { DashboardCardSection } from "~/components/dashboard/card-section";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { SemesterUnitsDrawer } from "~/components/dashboard/semester-units-drawer";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export default function Units() {
  const financeTabs: TabItem[] = [
    {
      icon: "document",
      value: "feeStatement",
      label: "Normal Registration",
      content: <UnitsTable data={normalUnits} />,
    },
    {
      icon: "documents",
      value: "receipts",
      label: "Supplementary",
      content: (
        <UnitsTable
          emptyIcon={"happy"}
          emptyPhrase="No supplementary"
          data={supplementaryUnits}
        />
      ),
    },
    {
      icon: "refresh",
      value: "feeStructure",
      label: "Retake",
      content: (
        <UnitsTable
          emptyIcon={"happy"}
          emptyPhrase="No retake"
          data={retakeUnits}
        />
      ),
    },
  ];

  return (
    <UnitsProvider>
      <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
        <DashbaordContentLayout icon="layers" title="Units">
          <div className="flex flex-col gap-4 p-4">
            <DashboardCardSection
              items={unitsData.slice(0, 2)}
              itemComponent={UnitsCard}
            />
          </div>
          <TabsUtils data={financeTabs} />
          <SemesterUnitsDrawer />
        </DashbaordContentLayout>
        <DesktopNotifications />
      </main>
    </UnitsProvider>
  );
}
