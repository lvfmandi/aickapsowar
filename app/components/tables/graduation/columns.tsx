import {
  type ColumnDef,
  type CellContext,
  createColumnHelper,
} from "@tanstack/react-table";
import { cn } from "~/lib/utils";

import { Badge } from "~/components/ui/badge";
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";

export type Graduation = {
  index: number;
  approvalLevel: string;
  status: "Pending" | "Cleared" | "Rejected";
};

const statusColors = {
  Cleared: { color: "#ffffff", backgroundColor: "#10B981" },
  Pending: { color: "#ffffff", backgroundColor: "#F59E0B" },
  Rejected: { color: "#ffffff", backgroundColor: "#EF4444" },
};

const statusCell: (
  props: CellContext<Graduation, unknown>
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

const columnHelper = createColumnHelper<Graduation>();

export const columns: ColumnDef<Graduation, any>[] = [
  columnHelper.accessor("index", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Index" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor("approvalLevel", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approval Level" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),

  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: statusCell,
    enableSorting: true,
  }),
];
