import { DataTable } from "~/components/tables/utils/data-table";
import { columns } from "~/components/tables/medical-leave-requisition/columns";
import type { MedicalLeave } from "~/lib/types/requisitions";

export const MedicalLeaveRequisition = ({
  data = [],
}: {
  data?: MedicalLeave[];
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
