import {
  type CellContext,
  type ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";

import { numberFormarter } from "~/lib/formarterts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";
import Icon from "~/components/utils/icons";
import { Button } from "~/components/ui/button";
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";

export type FeeStructure = {
  stage: string;
  programCode: string;
  postingDate: string;
  tuitionFees: number;
  totalFees: number;
};

const numberCell: (
  props: CellContext<FeeStructure, unknown>
) => React.ReactNode = ({ renderValue }) => (
  <span className="inline-table font-mono text-xs font-light">
    {renderValue() as number | string}
  </span>
);

const dateCell: (
  props: CellContext<FeeStructure, unknown>
) => React.ReactNode = ({ getValue }) => (
  <span className="inline-table font-light">
    {dayjs(getValue() as Date).format("D MMM YYYY") as number | string}
  </span>
);

const digitCell: (
  props: CellContext<FeeStructure, unknown>
) => React.ReactNode = ({ getValue }) => (
  <span className="inline-table font-mono text-xs font-light">
    {numberFormarter(getValue() as number) as string}
  </span>
);

const actionsCell: (
  props: CellContext<FeeStructure, unknown>
) => React.ReactNode = ({ row, getValue }) => (
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
        <span className="text-[13px]">Print Fee structure</span>
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const columnHelper = createColumnHelper<FeeStructure>();

export const columns: ColumnDef<FeeStructure, any>[] = [
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: actionsCell,
    enableSorting: false,
  }),
  columnHelper.accessor("stage", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("programCode", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program Code" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor((row) => new Date(row.postingDate), {
    id: "postingDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posting Date" />
    ),
    cell: dateCell,
    enableSorting: true,
  }),
  columnHelper.accessor("tuitionFees", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tuition Fees" />
    ),
    cell: digitCell,
    enableSorting: true,
  }),
  columnHelper.accessor("totalFees", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Fees" />
    ),
    cell: digitCell,
    enableSorting: true,
  }),
];
