import { data } from "./data";
import { DataTable } from "~/components/tables/utils/data-table";
import { columns } from "~/components/tables/receipts/columns";

export const Receipts = () => {
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
