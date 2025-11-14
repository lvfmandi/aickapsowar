import { DataTable } from "~/components/tables/utils/data-table";
import { columns } from "~/components/tables/gate-pass/columns";
import type { GatePassRequisition } from "~/lib/types/requisitions";

export const GatePassTable = ({
  data = [],
}: {
  data?: GatePassRequisition[];
}) => {
  return (
    <div className="py-4">
      <DataTable
        data={data}
        columns={columns}
        searchColumn={"reason"}
        emptyPhrase="No requisitions"
        searchPlaceholder={"Search Requisition"}
      />
    </div>
  );
};
