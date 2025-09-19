import dayjs from "dayjs";
import { toast } from "sonner";
import {
  type CellContext,
  type ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState, useTransition } from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

import { printReceipt } from "~/api/finance/printReceipt";

import type { Receipt } from "~/lib/types/finance";
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
import { PdfDrawer } from "~/components/utils/pdf-drawer";
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";

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

const actionsCell: (
  props: CellContext<Receipt, unknown>
) => React.ReactNode = ({ row, getValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
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
        <DropdownMenuCheckboxItem
          className="capitalize p-2 py-[6px] text-[13px] cursor-default hover:bg-accent hover:text-primary"
          onCheckedChange={() => {
            navigator.clipboard.writeText(row.getValue("bank_Slip_Cheque_No"));
            toast.success("Bank Slip. Copied");
          }}
        >
          <Icon name={"copy"} />
          Copy Bank Slip No.
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="capitalize p-2 py-[6px] text-[13px] cursor-default hover:bg-accent hover:text-primary"
          onCheckedChange={() => {
            navigator.clipboard.writeText(row.getValue("receipt_No"));
            toast.success("Receipt No. Copied");
          }}
        >
          <Icon name={"copy"} />
          Copy Receipt No.
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <PrintReceipt
            setOpen={setOpen}
            receiptNo={row.getValue("receipt_No")}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const PrintReceipt = ({
  receiptNo,
  setOpen,
}: {
  receiptNo: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [base64, setBase64] = useState<string | null>(null);
  const [_, startTransition] = useTransition();

  const handlePrintReceipt = () => {
    setDrawerOpen(true);

    startTransition(async () => {
      const { data, error } = await printReceipt({ receiptNo });
      if (error) {
        setDrawerOpen(() => {
          setOpen(false);
          return false;
        });

        toast.error(error);
      }
      setBase64(data ?? null);
    });
  };

  return (
    <div className="grid">
      <PdfDrawer
        base64={base64}
        open={drawerOpen}
        title={"Print Receipt"}
        documentTitle={"Receipt"}
        handleOnClose={() => setOpen(false)}
        handlePrintDoc={handlePrintReceipt}
        description={"Download or view your receipt"}
      />
    </div>
  );
};

const columnHelper = createColumnHelper<Receipt>();

export const columns: ColumnDef<Receipt, any>[] = [
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: actionsCell,
    enableSorting: false,
  }),
  columnHelper.accessor(
    (row) =>
      new Date(
        new Date(
          `${row.transaction_Date.month},
          ${row.transaction_Date.day},
          ${row.transaction_Date.year}`
        )
      ),
    {
      id: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: dateCell,
      enableSorting: true,
    }
  ),
  columnHelper.accessor("bank_Slip_Cheque_No", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bank Slip" />
    ),
    cell: numberCell,
    enableSorting: true,
  }),
  columnHelper.accessor("receipt_No", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Receipt No." />
    ),
    cell: numberCell,
    enableSorting: true,
  }),
  columnHelper.accessor("payment_Mode", {
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
