import { useState } from "react";

import {
  flexRender,
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import Icon, { Icons } from "~/components/utils/icons";
import { DataTablePagination } from "~/components/tables/utils/pagination";
import { DataTableViewOptions } from "~/components/tables/utils/column-toggle";

interface DataTableProps<TData, TValue> {
  data: TData[];
  searchColumn: string;
  emptyPhrase?: string;
  searchPlaceholder: string;
  emptyIcon?: keyof typeof Icons;
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
  data,
  columns,
  searchColumn,
  searchPlaceholder,
  emptyIcon = "fileTray",
  emptyPhrase = "No data!",
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center justify-between">
        <Input
          className="w-full max-w-sm"
          placeholder={searchPlaceholder}
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
        />
        <DataTableViewOptions table={table} />
      </div>
      <Table>
        <TableHeader className="bg-accent">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="text-sm">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-full font-mono text-center text-foreground/60"
              >
                <Icon
                  name={emptyIcon}
                  className="size-10 [&>path]:stroke-14 mx-auto"
                />
                <p className="text-xs font-light">{emptyPhrase}</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
