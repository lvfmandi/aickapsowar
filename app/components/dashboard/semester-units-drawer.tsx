import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
} from "~/components/ui/drawer";
import { useUnits } from "~/components/hooks/units";
import { semesterUnits } from "~/components/tables/semester-units/data";
import { SemesterUnitsTable } from "~/components/tables/semester-units";
import { Button } from "../ui/button";
import Icon from "../utils/icons";

export const SemesterUnitsDrawer = () => {
  const { showUnits, setShowUnits } = useUnits();

  return (
    <Drawer open={showUnits}>
      <DrawerContent className="container">
        <DrawerHeader>
          <DrawerTitle className="text-start flex justify-between items-center">
            <span>Y1S1 Normal Units</span>
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={() => setShowUnits(false)}
            >
              <Icon name="close" color="red" />
            </Button>
          </DrawerTitle>
          <SemesterUnitsTable
            emptyIcon="fileTray"
            // TODO: We ought to add units based on the clicked column
            data={semesterUnits}
            emptyPhrase="There are no units for this semester"
          />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
