import dayjs from "dayjs";
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
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";
import Icon from "~/components/utils/icons";
import { Button } from "~/components/ui/button";
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";

export type Receipt = {
  date: string;
  amount: number;
  bankSlip: string;
  receiptNo: number;
  paymentMode: string;
};

const numberCell: (props: CellContext<Receipt, unknown>) => React.ReactNode = ({
  renderValue,
}) => (
  <span className="inline-table font-mono text-xs font-light">
    {renderValue() as number | string}
  </span>
);

const dateCell: (props: CellContext<Receipt, unknown>) => React.ReactNode = ({
  getValue,
}) => (
  <span className="inline-table font-light">
    {dayjs(getValue() as Date).format("D MMM YYYY") as number | string}
  </span>
);

const digitCell: (props: CellContext<Receipt, unknown>) => React.ReactNode = ({
  getValue,
}) => (
  <span className="inline-table font-mono text-xs font-light">
    {numberFormarter(getValue() as number) as string}
  </span>
);

// TODO: Make sure all the actions work
const actionsCell: (
  props: CellContext<Receipt, unknown>
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
        <Icon name={"copy"} />
        Copy Bank Slip No.
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        className="capitalize p-2 py-[6px] text-[13px] cursor-default hover:bg-accent hover:text-primary"
        onCheckedChange={() => {
          navigator.clipboard.writeText(row.getValue("refNo"));
        }}
      >
        <Icon name={"copy"} />
        Copy Receipt No.
      </DropdownMenuCheckboxItem>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        className="capitalize p-2 py-[6px] text-[13px] cursor-default hover:bg-accent hover:text-primary"
        onCheckedChange={() => {
          navigator.clipboard.writeText(row.getValue("refNo"));
        }}
      >
        <Icon name={"print"} />
        <span className="text-[13px]">Print Receipt</span>
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const columnHelper = createColumnHelper<Receipt>();

export const columns: ColumnDef<Receipt, any>[] = [
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: actionsCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => new Date(row.date), {
    id: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: dateCell,
    enableSorting: true,
  }),
  columnHelper.accessor("receiptNo", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Receipt No." />
    ),
    cell: digitCell,
    enableSorting: true,
  }),
  columnHelper.accessor("bankSlip", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bank Slip" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("paymentMode", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Mode" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("amount", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: digitCell,
    enableSorting: true,
  }),
];
