import {
  type ColumnDef,
  type CellContext,
  createColumnHelper,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";
import Icon from "~/components/utils/icons";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";

export type SemesterUnit = {
  unit: string;
  description: string;
  unitType: string;
  taken: boolean;
};

// TODO: Make sure all the actions work
const actionsCell: (
  props: CellContext<SemesterUnit, unknown>
) => React.ReactNode = ({ row, getValue }) => (
  <div className="text-start">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          className="capitalize p-2 py-[6px] text-[13px] cursor-default hover:bg-accent hover:text-primary"
          onCheckedChange={() => {
            navigator.clipboard.writeText(row.getValue("refNo"));
          }}
        >
          <Icon name={"print"} />
          Print Unit Results
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const columnHelper = createColumnHelper<SemesterUnit>();

const displayCell: (
  props: CellContext<SemesterUnit, unknown>
) => React.ReactNode = ({ getValue }) => (
  <div className="text-start table">{getValue() as string}</div>
);

export const columns: ColumnDef<SemesterUnit, any>[] = [
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: actionsCell,
    enableSorting: false,
  }),
  columnHelper.accessor("unit", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
    cell: displayCell,
    enableSorting: true,
  }),
  columnHelper.accessor("description", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: displayCell,
    enableSorting: true,
  }),
  columnHelper.accessor("unitType", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit Type" />
    ),
    cell: displayCell,
    enableSorting: true,
  }),
  columnHelper.accessor("taken", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Taken" />
    ),
    cell: (info) => (
      <div className="text-start">
        {info.getValue() ? (
          <Checkbox checked disabled />
        ) : (
          <Checkbox disabled />
        )}
      </div>
    ),
    enableSorting: true,
  }),
];
