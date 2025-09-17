import type { Icons } from "~/components/utils/icons";
import type { Stage } from "~/lib/types/units";
import { columns } from "~/components/tables/units/columns";
import { DataTable } from "~/components/tables/utils/data-table";

export const UnitsTable = ({
  data,
  emptyIcon,
  emptyPhrase,
}: {
  data: Stage[];
  emptyPhrase?: string;
  emptyIcon?: keyof typeof Icons;
}) => {
  return (
    <div className="py-3">
      <DataTable
        data={data}
        columns={columns}
        emptyIcon={emptyIcon}
        searchColumn={"stage"}
        emptyPhrase={emptyPhrase}
        searchPlaceholder={"Search Stage"}
      />
    </div>
  );
};
