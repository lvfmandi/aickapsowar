import type { FeeStructure as FeeStructureType } from "~/lib/types/finance";

import { DataTable } from "~/components/tables/utils/data-table";
import { columns } from "~/components/tables/fee-structure/columns";

export const FeeStructure = ({ data }: { data: FeeStructureType[] }) => {
  return (
    <div className="py-3">
      <DataTable
        data={data}
        columns={columns}
        searchColumn={"stage"}
        searchPlaceholder={"Search stage e.g Y1S1"}
      />
    </div>
  );
};
