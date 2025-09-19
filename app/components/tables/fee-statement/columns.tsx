import dayjs from "dayjs";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import {
  type ColumnDef,
  type CellContext,
  createColumnHelper,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { printFeeStatement } from "~/api/finance/printFeeStatement";

import { numberFormarter } from "~/lib/formarterts";
import type { FeeStatement } from "~/lib/types/finance";

import {
  DropdownMenu,
  DropdownMenuItem,
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

const numberCell: (
  props: CellContext<FeeStatement, unknown>
) => React.ReactNode = ({ renderValue }) => (
  <span className="inline-table font-mono text-xs font-light">
    {renderValue() as number | string}
  </span>
);

const dateCell: (
  props: CellContext<FeeStatement, unknown>
) => React.ReactNode = ({ getValue }) => (
  <span className="inline-table font-light">
    {dayjs(getValue() as Date).format("D MMM YYYY") as number | string}
  </span>
);

const digitCell: (
  props: CellContext<FeeStatement, unknown>
) => React.ReactNode = ({ getValue }) => (
  <span className="inline-table font-mono text-xs font-light">
    {numberFormarter(getValue() as number) as string}
  </span>
);

const actionsCell: (
  props: CellContext<FeeStatement, unknown>
) => React.ReactNode = ({ row, getValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
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
            navigator.clipboard.writeText(row.getValue("entry_No"));
            toast.success("Reference No. Copied");
          }}
        >
          <Icon name={"copy"} />
          Copy Reference No.
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <PrintFeeStatement setOpen={setOpen} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const PrintFeeStatement = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [_, startTransition] = useTransition();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [base64, setBase64] = useState<string | null>(null);

  const handlePrintReceipt = () => {
    setDrawerOpen(true);

    startTransition(async () => {
      const { data, error } = await printFeeStatement();

      if (error) {
        setDrawerOpen(() => {
          setOpen(false);
          return false;
        });

        toast.error(error);
      }
      console.log({ data, error });

      setBase64(data ?? null);
    });
  };

  return (
    <div className="grid">
      <PdfDrawer
        base64={base64}
        open={drawerOpen}
        title={"Print Fee Statement"}
        documentTitle={"Fee Statement"}
        handleOnClose={() => setOpen(false)}
        handlePrintDoc={handlePrintReceipt}
        description={"Download or view your fee statement."}
      />
    </div>
  );
};

const columnHelper = createColumnHelper<FeeStatement>();

export const columns: ColumnDef<FeeStatement, any>[] = [
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: actionsCell,
    enableSorting: true,
  }),
  columnHelper.accessor("entry_No", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference No." />
    ),
    cell: numberCell,
    enableSorting: true,
  }),
  columnHelper.accessor(
    (row) =>
      new Date(
        `${row.posting_Date.month},
        ${row.posting_Date.day},
        ${row.posting_Date.year}`
      ),
    {
      id: "posting_Date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Posting Date" />
      ),
      cell: dateCell,
      enableSorting: true,
    }
  ),
  columnHelper.accessor("description", {
    header: "Description",
  }),
  columnHelper.accessor("amount_LCY", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: digitCell,
    enableSorting: true,
  }),
  columnHelper.accessor("debit_Amount_LCY", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Debit Amount" />
    ),
    cell: digitCell,
    enableSorting: true,
  }),
  columnHelper.accessor("credit_Amount_LCY", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Credit Amount" />
    ),
    cell: digitCell,
    enableSorting: true,
  }),
  columnHelper.accessor("original_Amt_LCY", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Original Amount" />
    ),
    cell: digitCell,
    enableSorting: true,
  }),
  columnHelper.accessor("remaining_Amount", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remaining Amount" />
    ),
    cell: digitCell,
    enableSorting: true,
  }),
];
