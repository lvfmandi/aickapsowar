import { toast } from "sonner";

import type { Stage } from "~/lib/types/units.d";

import { getStudentStages } from "~/api/units/getStudentStages";
import { getProgramUnitsByStage } from "~/api/units/getProgramUnitsByStage";
import { getStudentUnitsByStage } from "~/api/units/getStudentUnitsByStage";
import { confirmSemesterRegistration } from "~/api/units/confirmSemesterRegistration";

export const fetchUnits = async ({
  studentRegistration,
}: {
  studentRegistration: Stage;
}) => {
  const [
    { data: stdtUnits, error: studentUnitError },
    { data: prgmUnits, error: programUnitsError },
  ] = await Promise.all([
    getStudentUnitsByStage({
      stageCode: studentRegistration.stage,
    }),
    getProgramUnitsByStage({ currentStage: studentRegistration.stage }),
  ]);

  return {
    prgmUnits,
    stdtUnits,
    studentUnitError,
    programUnitsError,
  };
};

export const fetchUnitsData = async () => {
  const { data: stages = [], error: stagesError } = await getStudentStages();
  const { data: confirmRegistration = null, error: confirmRegistrationError } =
    await confirmSemesterRegistration();

  // gather base errors
  const baseError = stagesError ?? confirmRegistrationError;
  if (baseError) {
    toast.error(baseError);
    return { error: baseError };
  }

  // if registration is confirmed, fetch extra data
  if (confirmRegistration) {
    const {
      prgmUnits = [],
      stdtUnits = [],
      studentUnitError,
      programUnitsError,
    } = await fetchUnits({ studentRegistration: confirmRegistration });

    const regError = programUnitsError ?? studentUnitError;
    if (regError) {
      toast.error(regError.toString());
    }

    return {
      stages,
      prgmUnits,
      stdtUnits,
      confirmRegistration,
    };
  }

  // if no confirmed registration, return base data
  return { stages, prgmUnits: [], stdtUnits: [], confirmRegistration };
};
