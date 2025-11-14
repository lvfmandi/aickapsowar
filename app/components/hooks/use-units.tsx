import _ from "lodash";
import { toast } from "sonner";
import { useEffect, useTransition } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import {
  type Stage,
  type ProgramUnit,
  type StudentUnit,
} from "~/lib/types/units.d";
import { useStore } from "~/lib/store/index.store";
import { fetchUnits } from "~/lib/data-helpers/units.data";
import { UnitTabsSections } from "~/lib/store/unit.store";

import { getStudentStages } from "~/api/units/getStudentStages";
import { registerNextStage } from "~/api/units/registerNextStage";

import { UnitsTable } from "~/components/tables/units";
import { type TabItem } from "~/components/utils/tabs-utils";
import { columns as allUnitsColumns } from "~/components/tables/semester-units/all-columns";
import { columns as normalUnitsColumns } from "~/components/tables/semester-units/normal-registration-columns";

export const useUnits = ({
  stages,
  prgmUnits,
  stdtUnits,
  confirmRegistration,
}: {
  stages: Stage[];
  prgmUnits: ProgramUnit[];
  stdtUnits: StudentUnit[];
  confirmRegistration: Stage | null;
}) => {
  const {
    currentStage,
    programUnits,
    studentUnits,
    studentStages,
    setCurrentStage,
    setProgramUnits,
    setStudentUnits,
    setStudentStages,
    setCurrentUnitTab,
    setCurrentUnitColumns,
  } = useStore((state) => state);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!_.isEqual(stages, studentStages)) setStudentStages(stages);
    if (!_.isEqual(prgmUnits, programUnits)) setProgramUnits(prgmUnits);
    if (!_.isEqual(stdtUnits, studentUnits)) setStudentUnits(stdtUnits);
    if (!_.isEqual(confirmRegistration, currentStage))
      setCurrentStage(confirmRegistration ?? null);
  }, [stages, prgmUnits, stdtUnits, confirmRegistration]);

  useEffect(() => {
    startTransition(async () => {
      const { data: stages, error: stagesError } = await getStudentStages();
      if (stages) {
        setStudentStages(stages);
        setCurrentStage(
          stages.find((stage) => stage.stage == currentStage?.stage) ?? null
        );
      }

      if (stagesError) toast.error(stagesError);
    });
  }, [studentUnits]);

  const handlRegisterCourse = () => {
    startTransition(async () => {
      const { data, error } = await registerNextStage();

      if (error) toast.error(error);

      if (!data) return;

      setCurrentStage(data ?? null);
      const { prgmUnits, stdtUnits, studentUnitError, programUnitsError } =
        await fetchUnits({ studentRegistration: data });

      setProgramUnits(prgmUnits || []);
      setStudentUnits(stdtUnits || []);

      if (studentUnitError || programUnitsError)
        toast(studentUnitError || programUnitsError);
    });
  };

  const handleOnTabChange = (value: string) => {
    const dataItem = unitTabs.find((tab) => tab.value === value);
    if (dataItem) {
      setCurrentUnitColumns(dataItem.columns);
      setCurrentUnitTab(dataItem.value);
    }
  };

  const unitsData = [
    {
      label: "Registered Units",
      number: currentStage?.units_Taken || 0,
      completed: Boolean(currentStage?.units_Taken),
      description: `Of the ${programUnits?.length} units`,
    },
    {
      label: "Attempted Units",
      number: Array.isArray(studentStages)
        ? studentStages.reduce((acc, curr) => acc + curr.units_Taken, 0)
        : 0,
      description: `Since the beginning`,
    },
    {
      link: "/dashboard/units",
      label: "Register Units",
    },
  ];

  const allUnitsContent = (
    <UnitsTable
      data={studentStages}
      emptyIcon="fileTray"
      emptyPhrase="No units"
    />
  );

  const normalUnitsContent = (
    <UnitsTable
      emptyIcon="fileTray"
      emptyPhrase="No units"
      data={currentStage ? [currentStage] : []}
    />
  );

  const unitTabs: (TabItem & { columns: ColumnDef<any, any>[] })[] = [
    {
      value: UnitTabsSections.ALL.toString(),
      icon: "documents",
      columns: allUnitsColumns,
      content: allUnitsContent,
      label: "All Registered Units",
    },
    {
      value: UnitTabsSections.NORMAL.toString(),
      icon: "document",
      content: normalUnitsContent,
      columns: normalUnitsColumns,
      label: "Normal Registration",
      button: currentStage
        ? undefined
        : {
            disabled: isPending,
            children: "Register Units",
            onClick: handlRegisterCourse,
          },
    },
    // {
    //   icon: "documentText",
    //   value: SUPPLEMENTARY,
    //   label: "Supplementary",
    //   content: (
    //     <UnitsTable
    //       data={[]}
    //       emptyIcon={"happy"}
    //       emptyPhrase="No supplementary"
    //     />
    //   ),
    // },
    // {
    //   icon: "refresh",
    //   value: RETAKE,
    //   label: "Retake",
    //   content: (
    //     <UnitsTable data={[]} emptyIcon={"happy"} emptyPhrase="No retake" />
    //   ),
    // },
  ];

  return { unitTabs, unitsData, handleOnTabChange };
};
