import { useStore } from "~/lib/store/index.store";
import type { StudentUnit, ProgramUnit, MergedUnit } from "~/lib/types/units";

import type { Icons } from "~/components/utils/icons";
import { DataTable } from "~/components/tables/utils/data-table";

export const SemesterUnitsTable = ({
  data,
  emptyIcon,
  emptyPhrase,
}: {
  data: (StudentUnit | ProgramUnit | MergedUnit)[];
  emptyPhrase?: string;
  emptyIcon?: keyof typeof Icons;
}) => {
  const { currentUnitColumns: columns } = useStore((state) => state);

  console.log({ data, columns });

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
