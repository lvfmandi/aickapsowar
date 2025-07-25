import { currencyFormarter } from "~/lib/formarterts";

import { Button } from "~/components/ui/button";
import {
  IconDataDisplay,
  type IconData,
} from "~/components/utils/icon-data-display";
import { TabsUtils, type TabItem } from "~/components/utils/tabs-utils";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";

export default function Graduation() {
  const iconData: IconData = [
    {
      monoFont: true,
      key: "Graduation Code",
      value: "TSMHS000000972",
    },
    {
      key: "Student Name",
      value: "Charles Njagua",
    },
    {
      key: "Program",
      value: "Perioperative Theatre Technology Level 6",
    },
    {
      key: "Certificate",
      value: "Diploma in Perioperative Theatre Technology Level 6",
    },
  ];

  const tabItems: TabItem[] = [
    {
      icon: "school",
      value: "applyGraduation",
      label: "Apply for Graduation",
      content: (
        <div className="grid gap-4 py-4">
          <Button disabled className="w-full max-w-[240px]">
            Apply for Graduation
          </Button>
          <IconDataDisplay data={iconData} icon={"school"} />
        </div>
      ),
    },
    {
      icon: "checkmark",
      value: "clearanceRequest",
      label: "Clearance Request",
      content: (
        <div className="grid gap-4 py-4">
          <Button className="w-full max-w-[240px]">Clearance Request</Button>
        </div>
      ),
    },
    {
      icon: "cloudDownload",
      value: "downloadClearanceForm",
      label: "Download Clearance Form",
      content: (
        <Button disabled className="w-full">
          Download Clearance Form
        </Button>
      ),
    },
  ];

  return (
    <main className="lg:grid grid-cols-[auto_288px] h-full max-h-full overflow-hidden">
      <DashbaordContentLayout icon={"school"} title="Graduation">
        <TabsUtils data={tabItems} />
      </DashbaordContentLayout>
      <DesktopNotifications />
    </main>
  );
}
