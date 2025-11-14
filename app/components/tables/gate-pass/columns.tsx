import dayjs from "dayjs";
import {
  type ColumnDef,
  type CellContext,
  createColumnHelper,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { cn } from "~/lib/utils";
import type { GatePassRequisition } from "~/lib/types/requisitions";

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";
import Icon from "~/components/utils/icons";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";

const dateCell: (
  props: CellContext<GatePassRequisition, unknown>
) => React.ReactNode = ({ getValue }) => (
  <span className="inline-table font-light">
    {dayjs(getValue() as Date).format("D MMM YYYY") as number | string}
  </span>
);

const statusColors = {
  Open: { color: "#ffffff", backgroundColor: "#0066CC" },
  Pending: { color: "#ffffff", backgroundColor: "#F59E0B" },
  Approved: { color: "#ffffff", backgroundColor: "#10B981" },
  "Back to School": { color: "#ffffff", backgroundColor: "#b644efff" },
};

const statusCell: (
  props: CellContext<GatePassRequisition, unknown>
) => React.ReactNode = ({ getValue }) => (
  <Badge asChild variant={"outline"}>
    <span
      style={{
        color: statusColors[getValue() as keyof typeof statusColors]?.color,
        backgroundColor:
          statusColors[getValue() as keyof typeof statusColors]
            ?.backgroundColor,
      }}
      className={cn("flex items-center gap-1", `bg-[#F59E0B]`)}
    >
      {getValue() as string}
    </span>
  </Badge>
);

const actionsCell: (
  props: CellContext<GatePassRequisition, unknown>
) => React.ReactNode = ({ row }) => (
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
        disabled={row.getValue("status") !== "Pending"}
        className="capitalize p-2 py-[6px] text-[13px] cursor-default hover:bg-accent hover:text-primary"
      >
        <Icon name={"close"} />
        Cancel Requisition
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
const columnHelper = createColumnHelper<GatePassRequisition>();

export const columns: ColumnDef<GatePassRequisition, any>[] = [
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: actionsCell,
    enableSorting: false,
  }),

  columnHelper.accessor(
    (row) =>
      new Date(row.date_Out.year, row.date_Out.month - 1, row.date_Out.day),
    {
      id: "requestedDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date Out" />
      ),
      cell: dateCell,
      enableSorting: true,
    }
  ),

  columnHelper.accessor("purpose", {
    id: "purpose",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purpose" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor("destination", {
    id: "destination",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destination" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor("duration", {
    id: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor("return_Time", {
    id: "return_Time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Return Time" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: statusCell,
    enableSorting: true,
  }),
];
