import { financeData } from "~/lib/dashboard.data";

import { Receipts } from "~/components/tables/receipts";
import { FeeStatement } from "~/components/tables/fee-statement";
import { FeeStructure } from "~/components/tables/fee-structure";
import { FinanceCard } from "~/components/dashboard/finance-card";
import { TabsUtils, type TabItem } from "~/components/utils/tabs-utils";
import { DashboardCardSection } from "~/components/dashboard/card-section";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export default function Finances() {
  const financeTabs: TabItem[] = [
    {
      icon: "documentText",
      value: "feeStatement",
      label: "Fee Statement",
      content: <FeeStatement />,
    },
    {
      icon: "receipt",
      value: "receipts",
      label: "Receipts",
      content: <Receipts />,
    },
    {
      icon: "reader",
      value: "feeStructure",
      label: "Fee Structure",
      content: <FeeStructure />,
    },
  ];

  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon="wallet" title="Finances">
        <div className="flex flex-col gap-4 p-4">
          <DashboardCardSection
            items={financeData}
            itemComponent={FinanceCard}
          />
        </div>
        <TabsUtils data={financeTabs} />
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
