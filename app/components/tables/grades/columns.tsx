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
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";

export type Grade = {
  stage: string;
  program: string;
  semester: string;
  modeOfStudy: string;
};

// TODO: Make sure all the actions work
const actionsCell: (props: CellContext<Grade, unknown>) => React.ReactNode = ({
  row,
}) => {
  return (
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
            console.log({ value: row.getValue("stage") });
          }}
        >
          <Icon name={"print"} />
          Print Grades
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const columnHelper = createColumnHelper<Grade>();

export const columns: ColumnDef<Grade, any>[] = [
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: actionsCell,
    enableSorting: false,
  }),
  columnHelper.accessor("program", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("stage", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("semester", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Semester" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("modeOfStudy", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mode of Study" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
];
