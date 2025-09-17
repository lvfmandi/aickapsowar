import type { Stage } from "~/lib/types/units";

import type { Icons } from "~/components/utils/icons";
import { columns } from "~/components/tables/grades/columns";
import { DataTable } from "~/components/tables/utils/data-table";

export const Grades = ({
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
        emptyPhrase={emptyPhrase}
        searchColumn={"stage"}
        searchPlaceholder={"Search Stage"}
      />
    </div>
  );
};
