import type { Receipt } from "~/lib/types/finance";

import { columns } from "~/components/tables/receipts/columns";
import { DataTable } from "~/components/tables/utils/data-table";

export const Receipts = ({ data }: { data: Receipt[] }) => {
  return (
    <div className="py-3">
      <DataTable
        data={data}
        columns={columns}
        searchColumn={"bankSlip"}
        searchPlaceholder={"Search Bank Slip"}
      />
    </div>
  );
};
