import { DashboardCardSection } from "~/components/dashboard/card-section";
import { FinanceCard } from "~/components/dashboard/finance-card";
import { LectureCard } from "~/components/dashboard/lecture-card";
import { UnitsCard } from "~/components/dashboard/units-card";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";
import { IconText } from "~/components/utils/icon-text";
import Icon from "~/components/utils/icons";

export default function Home() {
  const financeData = [
    {
      label: "Total Fees",
      amountPaid: 50000,
      percentage: 80,
    },
    {
      label: "Tuition Fees",
      amountPaid: 27360,
      percentage: 64.38,
    },
    {
      label: "Hostel Fees",
      amountPaid: 10000,
      percentage: 100,
    },
    {
      label: "Other Charges",
      amountPaid: 12640,
      percentage: 100,
    },
  ];

  const unitsData = [
    {
      label: "Registered Units",
      number: 7,
      completed: true,
    },
    {
      label: "Attempted Units",
      number: 56,
    },
    {
      link: "/dashboard/units",
      label: "Register Units",
    },
  ];

  const lectureCards = [
    {
      number: 60,
      completed: true,
      label: "Temporary Card",
      description: "Temporary Card",
    },
    {
      number: 80,
      completed: true,
      label: "Permanent Card",
      description: "Permanent Card",
    },
    {
      number: 100,
      completed: false,
      label: "Exam Card",
      description: "Exam Card",
    },
  ];

  // TODO: fetch the real data

  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <div className="h-full overflow-y-auto">
        <IconText icon={"home"} text={"Dashboard"} className="hidden lg:flex" />
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
      </div>
      <DesktopNotifications />
    </main>
  );
}
