import {
  type ColumnDef,
  type CellContext,
  createColumnHelper,
  type Row,
} from "@tanstack/react-table";
import { toast } from "sonner";

import { dropUnit } from "~/api/units/dropUnits";
import { registerUnit } from "~/api/units/registerUnit";

import type { MergedUnit } from "~/lib/types/units";
import { REG_FOR_STAGE, REG_FOR_VALUES } from "~/lib/utils";

import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";
import { useStore } from "~/lib/store/index.store";

// const actionsCell: (
//   props: CellContext<StudentUnit, unknown>
// ) => React.ReactNode = ({ row, getValue }) => (
//   <div className="text-start">
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="h-8 w-8 p-0">
//           <span className="sr-only">Open menu</span>
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="start">
//         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//         <DropdownMenuCheckboxItem
//           className="capitalize p-2 py-[6px] text-[13px] cursor-default hover:bg-accent hover:text-primary"
//           onCheckedChange={() => {
//             navigator.clipboard.writeText(row.getValue("refNo"));
//           }}
//         >
//           <Icon name={"print"} />
//           Print Unit Results
//         </DropdownMenuCheckboxItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   </div>
// );

const handleDropUntit = async (row: Row<MergedUnit>) => {
  const { data, error } = await dropUnit({
    unitCode: row.original.code,
  });
  if (error) toast.error(error);

  if (data) {
    const setStudentUnits = useStore.getState().setStudentUnits;
    toast.success("You have successfully dropped a unit");
    setStudentUnits(data);
  }
};

const handleRegisterUnit = async (row: Row<MergedUnit>) => {
  const { data, error } = await registerUnit({
    unitCode: row.original.code,
    registerFor: REG_FOR_VALUES.indexOf(REG_FOR_STAGE),
  });

  if (error) toast.error(error);

  if (data) {
    const setStudentUnits = useStore.getState().setStudentUnits;
    toast.success("You have successfully registered a unit");
    setStudentUnits(data);
  }
};

const columnHelper = createColumnHelper<MergedUnit>();

const displayCell: (
  props: CellContext<MergedUnit, unknown>
) => React.ReactNode = ({ getValue }) => (
  <div className="text-start table">{getValue() as string}</div>
);

export const columns: ColumnDef<MergedUnit, any>[] = [
  columnHelper.accessor("code", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
    cell: displayCell,
    enableSorting: true,
  }),
  columnHelper.accessor("desription", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: displayCell,
    enableSorting: true,
  }),
  // columnHelper.accessor("unit_Type", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Unit Type" />
  //   ),
  //   cell: displayCell,
  //   enableSorting: true,
  // }),
  columnHelper.accessor("take", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Take" />
    ),
    cell: (info) => (
      <div className="text-start">
        <Checkbox
          checked={info.getValue()}
          onClick={() =>
            info.getValue()
              ? handleDropUntit(info.row)
              : handleRegisterUnit(info.row)
          }
        />
      </div>
    ),
    enableSorting: true,
  }),
];
