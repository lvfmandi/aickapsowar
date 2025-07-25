import {
  columns,
  type SemesterUnit,
} from "~/components/tables/semester-units/columns";
import type { Icons } from "~/components/utils/icons";
import { DataTable } from "~/components/tables/utils/data-table";

export const SemesterUnitsTable = ({
  data,
  emptyIcon,
  emptyPhrase,
}: {
  emptyPhrase?: string;
  data: SemesterUnit[];
  emptyIcon?: keyof typeof Icons;
}) => {
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
