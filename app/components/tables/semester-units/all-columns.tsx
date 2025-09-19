import {
  type ColumnDef,
  type CellContext,
  createColumnHelper,
} from "@tanstack/react-table";

import type { StudentUnit } from "~/lib/types/units.d";

import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/tables/utils/column-header";

const columnHelper = createColumnHelper<StudentUnit>();

const displayCell: (
  props: CellContext<StudentUnit, unknown>
) => React.ReactNode = ({ getValue }) => (
  <div className="text-start table">{getValue() as string}</div>
);

export const columns: ColumnDef<StudentUnit, any>[] = [
  columnHelper.accessor("unit", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
    cell: displayCell,
    enableSorting: true,
  }),
  columnHelper.accessor("desription", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: displayCell,
    enableSorting: true,
  }),
  columnHelper.display({
    id: "taken",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Taken" />
    ),
    cell: (info) => (
      <div className="text-start">
        <Checkbox checked disabled />
      </div>
    ),
    enableSorting: true,
  }),
];
