import { toast } from "sonner";
import type { Row } from "@tanstack/react-table";
import { useEffect, useTransition, type Dispatch } from "react";

import { getStudentUnitsByStage } from "~/api/units/getStudentUnitsByStage";

import { NORMAL } from "~/lib/utils";
import { useStore } from "~/lib/store/index.store";
import type { Stage, MergedUnit } from "~/lib/types/units";

import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
} from "~/components/ui/drawer";
import Icon from "~/components/utils/icons";
import { Button } from "~/components/ui/button";
import { LoaderImage } from "~/components/utils/loader";
import { SemesterUnitsTable } from "~/components/tables/semester-units";

export const SemesterUnitsDrawer = ({
  record,
  setOpen,
}: {
  record: Row<Stage>;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const stage = record.original;
  const [isPending, startTransition] = useTransition();
  const {
    currentStage,
    currentUnits,
    programUnits,
    studentUnits,
    currentUnitTab,
    setCurrentUnits,
  } = useStore((state) => state);

  function mergedUnits(): MergedUnit[] {
    const studentCodes = new Set(studentUnits.map((s) => s.code));

    return programUnits.map((pu) => ({
      ...pu,
      take: studentCodes.has(pu.code),
    }));
  }

  useEffect(() => {
    startTransition(async () => {
      if (currentUnitTab == NORMAL) {
        setCurrentUnits(mergedUnits());
      } else {
        const { data, error } = await getStudentUnitsByStage({
          stageCode: stage.stage,
        });

        if (error) toast.error(error);
        if (data) setCurrentUnits(data);
      }
    });
  }, [stage, studentUnits, programUnits, currentStage]);

  return (
    <Drawer onClose={() => setOpen(false)}>
      <DrawerTrigger asChild>
        <Button
          variant={"ghost"}
          className="capitalize p-2 py-[6px] text-[13px] cursor-default hover:bg-accent hover:text-primary"
        >
          <Icon name={"eye"} />
          View Units
        </Button>
      </DrawerTrigger>
      <DrawerContent className="container">
        <DrawerHeader>
          <DrawerTitle className="text-start">
            <span>
              {stage.stage} {stage.semester}
            </span>
          </DrawerTitle>
          {isPending ? (
            <div className="flex items-center gap-4">
              <LoaderImage />
              <span>Loading ...</span>
            </div>
          ) : (
            <SemesterUnitsTable
              data={currentUnits}
              emptyIcon="fileTray"
              emptyPhrase="There are no units for this semester"
            />
          )}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
