import type { StateCreator } from "zustand";
import type { ColumnDef } from "@tanstack/react-table";

import type {
  Stage,
  StudentUnit,
  ProgramUnit,
  MergedUnit,
} from "~/lib/types/units";
import { ALL, UNIT_TABS_SECTIONS } from "~/lib/utils";

import { columns } from "~/components/tables/semester-units/all-columns";

export interface UnitState {
  studentStages: Stage[];
  currentStage: Stage | null;
  programUnits: ProgramUnit[];
  studentUnits: StudentUnit[];
  currentUnitColumns: ColumnDef<any, any>[];
  currentUnitTab: (typeof UNIT_TABS_SECTIONS)[number];
  currentUnits: (StudentUnit | ProgramUnit | MergedUnit)[];

  setStudentStages: (stages: Stage[]) => void;
  setProgramUnits: (units: ProgramUnit[]) => void;
  setCurrentStage: (stage: Stage | null) => void;
  setStudentUnits: (units: StudentUnit[]) => void;
  setCurrentUnitColumns: (columns: ColumnDef<any, any>[]) => void;
  setCurrentUnitTab: (tab: (typeof UNIT_TABS_SECTIONS)[number]) => void;
  setCurrentUnits: (units: (StudentUnit | ProgramUnit | MergedUnit)[]) => void;
}

export const createUnitSlice: StateCreator<UnitState> = (set) => ({
  currentUnits: [],
  programUnits: [],
  studentUnits: [],
  studentStages: [],
  currentStage: null,
  currentUnitTab: ALL,
  currentUnitColumns: columns,
  setCurrentUnits: (currentUnits) => set(() => ({ currentUnits })),
  setProgramUnits: (programUnits) => set(() => ({ programUnits })),
  setStudentUnits: (studentUnits) => set(() => ({ studentUnits })),
  setCurrentStage: (currentStage) => set(() => ({ currentStage })),
  setStudentStages: (studentStages) => set(() => ({ studentStages })),
  setCurrentUnitColumns: (currentColumns) =>
    set(() => ({ currentUnitColumns: currentColumns })),
  setCurrentUnitTab: (currentUnitTab) => set(() => ({ currentUnitTab })),
});
