import {
  type CellContext,
  type ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { numberFormarter } from "~/lib/formarterts";

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";
import Icon from "~/components/utils/icons";
import { Button } from "~/components/ui/button";
import { useUnits } from "~/components/hooks/units";
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";
import type { Stage } from "~/lib/types/units";

const digitCell: (props: CellContext<Stage, unknown>) => React.ReactNode = ({
  getValue,
}) => (
  <span className="inline-table font-mono text-xs font-light">
    {numberFormarter(getValue() as number) as string}
  </span>
);

// TODO: Make sure all the actions work
const actionsCell: (props: CellContext<Stage, unknown>) => React.ReactNode = ({
  row,
  getValue,
}) => {
  // TODO: Here we will make sure we show the correct unit
  const { setShowUnits } = useUnits();

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
            setShowUnits(true);
            console.log({ value: row.getValue("stage") });
          }}
        >
          <Icon name={"eye"} />
          View Units
        </DropdownMenuCheckboxItem>
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
