import { DataTable } from "~/components/tables/utils/data-table";
import { columns } from "~/components/tables/academic-requisition/columns";
import type { AcademicRequisition as TypeAcademicRequisition } from "~/lib/types/requisitions";

export const AcademicRequisition = ({
  data = [],
}: {
  data?: TypeAcademicRequisition[];
}) => {
  return (
    <div className="p-4">
      <DataTable
        data={data}
        columns={columns}
        searchColumn={"reason"}
        emptyPhrase="No requisitions"
        searchPlaceholder={"Search Reason"}
      />
    </div>
  );
};
