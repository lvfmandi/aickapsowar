import { data } from "~/components/tables/graduation/data";
import { columns } from "~/components/tables/graduation/columns";
import { DataTable } from "~/components/tables/utils/data-table";

export const Graduation = () => {
  return (
    <div className="">
      <DataTable
        data={data}
        columns={columns}
        searchColumn={"approvalLevel"}
        searchPlaceholder={"Search Approval Level"}
      />
    </div>
  );
};
