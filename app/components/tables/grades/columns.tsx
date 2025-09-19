import { toast } from "sonner";
import { useState, useTransition } from "react";
import {
  type ColumnDef,
  type CellContext,
  createColumnHelper,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import type { Stage } from "~/lib/types/units.d";

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { PdfDrawer } from "~/components/utils/pdf-drawer";
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";
import { getProvisionalResults } from "~/api/grades/getProvisionalResults";

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
        <PrintProvisionalGrades
          setOpen={setOpen}
          stage={row.getValue("stage")}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const PrintProvisionalGrades = ({
  stage,
  setOpen,
}: {
  stage: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [base64, setBase64] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handlePrintProvisionalGrades = () => {
    setOpenDrawer(true);

    startTransition(async () => {
      const { data, error } = await getProvisionalResults({ stage });
      if (error) {
        setOpen(false);
        toast.error(error);
        setOpenDrawer(false);
      }
      setBase64(data ?? null);
    });
  };

  return (
    <PdfDrawer
      base64={base64}
      open={openDrawer}
      title={"Print Grades"}
      handleOnClose={() => setOpen(false)}
      documentTitle={"Provisional Grades"}
      handlePrintDoc={handlePrintProvisionalGrades}
      description={"Download or view your provisional grades"}
    />
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
  columnHelper.accessor("mode_of_Study", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mode of Study" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
];
