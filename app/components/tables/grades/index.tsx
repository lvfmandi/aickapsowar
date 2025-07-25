import type { Icons } from "~/components/utils/icons";
import { DataTable } from "~/components/tables/utils/data-table";
import { columns, type Grade } from "~/components/tables/grades/columns";

export const Grades = ({
  data,
  emptyIcon,
  emptyPhrase,
}: {
  data: Grade[];
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
