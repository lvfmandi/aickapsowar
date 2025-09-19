import dayjs from "dayjs";
import {
  type ColumnDef,
  type CellContext,
  createColumnHelper,
} from "@tanstack/react-table";
import { Link } from "react-router";
import { MoreHorizontal } from "lucide-react";

import { cn } from "~/lib/utils";
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

export type AcademicRequisition = {
  type: string; // e.g., "Academic Leave", "Return from Leave", "Special Exam", etc.
  requestedDate: Date;
  reason: string;
  supportingDocuments: string[]; // could be file URLs or paths
  status: "Pending" | "Approved" | "Rejected";
  reviewedBy?: string; // optional in case it hasn't been reviewed yet
  reviewedAt?: Date; // optional in case it hasn't been reviewed yet
};

const dateCell: (
  props: CellContext<AcademicRequisition, unknown>
) => React.ReactNode = ({ getValue }) => (
  <span className="inline-table font-light">
    {dayjs(getValue() as Date).format("D MMM YYYY") as number | string}
  </span>
);

const fileCell: (
  props: CellContext<AcademicRequisition, unknown>
) => React.ReactNode = ({ getValue }) => (
  <Badge asChild variant={"outline"}>
    <Link
      to={(getValue() as string[])[0]}
      className="group !font-light !text-sm"
    >
      <span className="flex items-center gap-1">
        <Icon
          name="link"
          className="inline -rotate-45 text-blue-500 group-hover:text-primary"
        />
        Document
      </span>
    </Link>
  </Badge>
);

const statusColors = {
  Approved: { color: "#ffffff", backgroundColor: "#10B981" },
  Pending: { color: "#ffffff", backgroundColor: "#F59E0B" },
  Rejected: { color: "#ffffff", backgroundColor: "#EF4444" },
};

const statusCell: (
  props: CellContext<AcademicRequisition, unknown>
) => React.ReactNode = ({ getValue }) => (
  <Badge asChild variant={"outline"}>
    <span
      style={{
        color: statusColors[getValue() as keyof typeof statusColors].color,
        backgroundColor:
          statusColors[getValue() as keyof typeof statusColors].backgroundColor,
      }}
      className={cn("flex items-center gap-1", `bg-[#F59E0B]`)}
    >
      {getValue() as string}
    </span>
  </Badge>
);

const actionsCell: (
  props: CellContext<AcademicRequisition, unknown>
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
const columnHelper = createColumnHelper<AcademicRequisition>();

export const columns: ColumnDef<AcademicRequisition, any>[] = [
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: actionsCell,
    enableSorting: false,
  }),

  columnHelper.accessor("type", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type of Requisition" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor((row) => new Date(row.requestedDate), {
    id: "requestedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested Date" />
    ),
    cell: dateCell,
    enableSorting: true,
  }),

  columnHelper.accessor("reason", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reason" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),

  columnHelper.accessor("supportingDocuments", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Documents" />
    ),
    cell: fileCell,
    enableSorting: false,
  }),

  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: statusCell,
    enableSorting: true,
  }),

  columnHelper.accessor("reviewedBy", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reviewed By" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),

  columnHelper.accessor("reviewedAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reviewed At" />
    ),
    cell: dateCell,
    enableSorting: true,
  }),
];
