import { toast } from "sonner";
import {
  type ColumnDef,
  type CellContext,
  createColumnHelper,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState, useTransition } from "react";

import {
  printFeeStructure,
  type PrintFeeStructure as PrintFeeStructureInterface,
} from "~/api/finance/printFeeStructure";

import { numberFormarter } from "~/lib/formarterts";
import type { FeeStructure } from "~/lib/types/finance";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { PdfDrawer } from "~/components/utils/pdf-drawer";
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";

const digitCell: (
  props: CellContext<FeeStructure, unknown>
) => React.ReactNode = ({ getValue }) => (
  <span className="inline-table font-mono text-xs font-light">
    {numberFormarter(getValue() as number) as string}
  </span>
);

const actionsCell: (
  props: CellContext<FeeStructure, unknown>
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
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <PrintFeeStructure
            setOpen={setOpen}
            data={{
              stageCode: row.original.stage_Code,
              campusCode: row.original.auxiliaryIndex3,
            }}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const PrintFeeStructure = ({
  data: incomingData,
  setOpen,
}: {
  data: PrintFeeStructureInterface;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [base64, setBase64] = useState<string | null>(null);
  const [_, startTransition] = useTransition();

  const handlePrintFeeStructure = () => {
    startTransition(async () => {
      const { data, error } = await printFeeStructure(incomingData);
      if (error) toast.error(error);
      setBase64(data ?? null);
    });
  };

  return (
    <div className="grid">
      <PdfDrawer
        base64={base64}
        title={"Print Fee Structure"}
        documentTitle={"Fee Structure"}
        handleOnClose={() => setOpen(false)}
        handlePrintDoc={handlePrintFeeStructure}
        description={"Download or view your fee structure."}
      />
    </div>
  );
};

const columnHelper = createColumnHelper<FeeStructure>();

export const columns: ColumnDef<FeeStructure, any>[] = [
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: actionsCell,
    enableSorting: false,
  }),
  columnHelper.accessor("stage_Code", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("programme_Code", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Programme Code" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("settlemet_Type", {
    enableSorting: true,
    cell: (info) => info.getValue(),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Settlement Type" />
    ),
  }),
  columnHelper.accessor("stage_Charges", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage Charges" />
    ),
    cell: digitCell,
    enableSorting: true,
  }),
  columnHelper.accessor("total_Charges", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Charges" />
    ),
    cell: digitCell,
    enableSorting: true,
  }),
];
