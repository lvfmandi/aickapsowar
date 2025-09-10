import { toast } from "sonner";

import type { Semester, Stage } from "~/lib/types/units";
import { unitsData } from "~/lib/dashboard.data";

import { getStudentStages } from "~/api/units/getStudentStages";
import { registerNextStage } from "~/api/units/registerNextStage";
import { getCurrentSemester } from "~/api/units/getCurrentSemester";
import { confirmSemesterRegistration } from "~/api/units/confirmSemesterRegistration";

import {
  retakeUnits,
  supplementaryUnits,
} from "~/components/tables/units/data";
import type { Route } from "./+types/units";
import UnitsProvider from "~/components/hooks/units";
import { UnitsTable } from "~/components/tables/units";
import { UnitsCard } from "~/components/dashboard/units-card";
import { TabsUtils, type TabItem } from "~/components/utils/tabs-utils";
import { DashboardCardSection } from "~/components/dashboard/card-section";
import { DashbaordContentLayout } from "~/components/dashboard/content-layout";
import { SemesterUnitsDrawer } from "~/components/dashboard/semester-units-drawer";
import { DesktopNotifications } from "~/components/notifications/desktop-notifications";
import { getStudentUnitsByStage } from "~/api/units/getStudentUnitsByStage";
import { useEffect } from "react";
import { getProgramUnitsByStage } from "~/api/units/getProgramUnitsByStage";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const { data: stages, error } = await getStudentStages();
  const { data: currentSemester, error: currentSemesterError } =
    await getCurrentSemester();
  const { data: confirmRegistration, error: confirmRegistrationError } =
    await confirmSemesterRegistration();

  const { data: programUnits, error: programUnitsError } =
    await getProgramUnitsByStage();
  const { data: studentUnits, error: studentUnitError } =
    await getStudentUnitsByStage();

  console.log({ confirmRegistration });

  if (error ?? currentSemesterError)
    return toast.error(error ?? currentSemesterError);

  return { stages, currentSemester, confirmRegistration };
}

export default function Units({ loaderData }: Route.ComponentProps) {
  const {
    stages = [],
    confirmRegistration,
    currentSemester,
  } = loaderData as {
    stages?: Stage[];
    currentSemester?: Semester;
    confirmRegistration?: Stage;
  };

  useEffect(() => {}, [confirmRegistration, currentSemester]);

  // if(!currentSemester)
  const handlegisterCourse = async () => {
    const { data, error } = await registerNextStage();
    console.log({ data, error });

    if (data) {
      const studentUnits = getStudentUnitsByStage({
        stageCode: "",
        registerFor: "",
      });
    }

    if (error) toast.error(error);
  };

  const financeTabs: TabItem[] = [
    {
      value: "all",
      icon: "documents",
      label: "All Registered Units",
      content: (
        <UnitsTable data={stages} emptyIcon="fileTray" emptyPhrase="No units" />
      ),
    },
    {
      value: "normal",
      icon: "document",
      button: Boolean(confirmRegistration)
        ? undefined
        : {
            children: "Register Units",
            onClick: handlegisterCourse,
          },
      label: "Normal Registration",
      content: (
        <UnitsTable data={stages} emptyIcon="fileTray" emptyPhrase="No units" />
      ),
    },
    {
      icon: "documentText",
      value: "supplementary",
      label: "Supplementary",
      content: (
        <UnitsTable
          emptyIcon={"happy"}
          data={supplementaryUnits}
          emptyPhrase="No supplementary"
        />
      ),
    },
    {
      icon: "refresh",
      value: "retake",
      label: "Retake",
      content: (
        <UnitsTable
          data={retakeUnits}
          emptyIcon={"happy"}
          emptyPhrase="No retake"
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
