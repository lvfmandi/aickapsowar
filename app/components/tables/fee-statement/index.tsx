import { DataTable } from "~/components/tables/utils/data-table";
import { columns } from "~/components/tables/fee-statement/columns";
import type { FeeStatement as FeeStatementType } from "~/lib/types/finance";

export const FeeStatement = ({ data }: { data: FeeStatementType[] }) => {
  return (
    <div className="py-3">
      <DataTable
        data={data}
        columns={columns}
        searchColumn={"description"}
        searchPlaceholder={"Search description"}
      />
    </div>
  );
};
