import {
  columns,
  type UnitsPerSemester,
} from "~/components/tables/units/columns";
import type { Icons } from "~/components/utils/icons";
import { DataTable } from "~/components/tables/utils/data-table";

export const UnitsTable = ({
  data,
  emptyIcon,
  emptyPhrase,
}: {
  emptyPhrase?: string;
  data: UnitsPerSemester[];
  emptyIcon?: keyof typeof Icons;
}) => {
  return (
    <div className="py-3">
      <DataTable
        data={data}
        columns={columns}
        emptyIcon={emptyIcon}
        emptyPhrase={emptyPhrase}
        searchColumn={"stage"}
        searchPlaceholder={"Search Stage"}
      />
    </div>
  );
};
