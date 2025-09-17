import { toast } from "sonner";

import { financeData } from "~/lib/dashboard.data";

import { getReceipts } from "~/api/finance/getReceipts";
import { getFeeStatement } from "~/api/finance/getFeeStatement";
import { getFeeStructure } from "~/api/finance/getFeeStructure";

import type { Route } from "./+types/finances";
import { Receipts } from "~/components/tables/receipts";
import { FeeStatement } from "~/components/tables/fee-statement";
import { FeeStructure } from "~/components/tables/fee-structure";
import { FinanceCard } from "~/components/dashboard/finance-card";
import { TabsUtils, type TabItem } from "~/components/utils/tabs-utils";
import { DashboardCardSection } from "~/components/dashboard/card-section";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export const clientLoader = async ({}: Route.ClientLoaderArgs) => {
  const [
    { data: receipts = [], error: receiptsError },
    { data: feeStatement = [], error: feeStatementError },
    { data: feeStructure = [], error: feeStructureError },
  ] = await Promise.all([getReceipts(), getFeeStatement(), getFeeStructure()]);

  const baseError = receiptsError ?? feeStatementError ?? feeStructureError;
  if (baseError) toast.error(baseError);

  return { receipts, feeStatement, feeStructure };
};

export default function Finances({ loaderData }: Route.ComponentProps) {
  const { receipts, feeStatement, feeStructure } = loaderData;

  const financeTabs: TabItem[] = [
    {
      icon: "documentText",
      value: "feeStatement",
      label: "Fee Statement",
      content: <FeeStatement data={feeStatement} />,
    },
    {
      icon: "receipt",
      value: "receipts",
      label: "Receipts",
      content: <Receipts data={receipts} />,
    },
    {
      icon: "reader",
      value: "feeStructure",
      label: "Fee Structure",
      content: <FeeStructure data={feeStructure} />,
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
