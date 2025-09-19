import type { StateCreator } from "zustand";
import type { ColumnDef } from "@tanstack/react-table";

import {
  type Stage,
  type MergedUnit,
  type StudentUnit,
  type ProgramUnit,
} from "~/lib/types/units.d";

import { columns } from "~/components/tables/semester-units/all-columns";

export enum UnitTabsSections {
  ALL,
  NORMAL,
  SUPPLEMENTARY,
  RETAKE,
}
export interface UnitState {
  currentUnitTab: string;
  studentStages: Stage[];
  currentStage: Stage | null;
  programUnits: ProgramUnit[];
  studentUnits: StudentUnit[];
  currentUnitColumns: ColumnDef<any, any>[];
  currentUnits: (StudentUnit | ProgramUnit | MergedUnit)[];

  setCurrentUnitTab: (tab: string) => void;
  setStudentStages: (stages: Stage[]) => void;
  setCurrentStage: (stage: Stage | null) => void;
  setProgramUnits: (units: ProgramUnit[]) => void;
  setStudentUnits: (units: StudentUnit[]) => void;
  setCurrentUnitColumns: (columns: ColumnDef<any, any>[]) => void;
  setCurrentUnits: (units: (StudentUnit | ProgramUnit | MergedUnit)[]) => void;
}

export const createUnitSlice: StateCreator<UnitState> = (set) => ({
  currentUnits: [],
  programUnits: [],
  studentUnits: [],
  studentStages: [],
  currentStage: null,
  currentUnitColumns: columns,
  currentUnitTab: UnitTabsSections.ALL.toString(),
  setCurrentUnitColumns: (currentColumns) =>
    set(() => ({ currentUnitColumns: currentColumns })),
  setCurrentUnits: (currentUnits) => set(() => ({ currentUnits })),
  setProgramUnits: (programUnits) => set(() => ({ programUnits })),
  setStudentUnits: (studentUnits) => set(() => ({ studentUnits })),
  setCurrentStage: (currentStage) => set(() => ({ currentStage })),
  setStudentStages: (studentStages) => set(() => ({ studentStages })),
  setCurrentUnitTab: (currentUnitTab) => set(() => ({ currentUnitTab })),
});
