import { useStore } from "~/lib/store/index.store";
import type { StudentUnit, ProgramUnit, MergedUnit } from "~/lib/types/units.d";

import type { Icons } from "~/components/utils/icons";
import { DataTable } from "~/components/tables/utils/data-table";

export const SemesterUnitsTable = ({
  data,
  emptyIcon,
  emptyPhrase,
}: {
  emptyPhrase?: string;
  emptyIcon?: keyof typeof Icons;
  data: (StudentUnit | ProgramUnit | MergedUnit)[];
}) => {
  const { currentUnitColumns: columns } = useStore((state) => state);

  return (
    <div className="py-3">
      <DataTable
        data={data}
        columns={columns}
        emptyIcon={emptyIcon}
        emptyPhrase={emptyPhrase}
        searchColumn={"description"}
        searchPlaceholder={"Search Unit Description"}
      />
    </div>
  );
};
