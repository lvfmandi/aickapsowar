import { DataTable } from "~/components/tables/utils/data-table";
import { data } from "~/components/tables/academic-requisition/data";
import { columns } from "~/components/tables/academic-requisition/columns";

export const AcademicRequisition = () => {
  return (
    <div className="p-4">
      <DataTable
        data={data}
        columns={columns}
        searchColumn={"reason"}
        searchPlaceholder={"Search Reason"}
      />
    </div>
  );
};
