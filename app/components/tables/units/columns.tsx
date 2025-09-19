import {
  type CellContext,
  type ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import type { Stage } from "~/lib/types/units.d";
import { numberFormarter } from "~/lib/formarterts";

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";
import { SemesterUnitsDrawer } from "~/components/dashboard/semester-units-drawer";

const digitCell: (props: CellContext<Stage, unknown>) => React.ReactNode = ({
  getValue,
}) => (
  <span className="inline-table font-mono text-xs font-light">
    {numberFormarter(getValue() as number) as string}
  </span>
);

const actionsCell: (props: CellContext<Stage, unknown>) => React.ReactNode = ({
  row,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={(open) => setOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <SemesterUnitsDrawer record={row} setOpen={setOpen} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const columnHelper = createColumnHelper<Stage>();

export const columns: ColumnDef<Stage, any>[] = [
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: actionsCell,
    enableSorting: false,
  }),
  columnHelper.accessor("programme", {
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
  columnHelper.accessor("register_for", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registered For" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("mode_of_Study", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mode of Study" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("units_Taken", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Units Taken" />
    ),
    cell: digitCell,
    enableSorting: true,
  }),
];
