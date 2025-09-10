import dayjs from "dayjs";
import { numberFormarter } from "~/lib/formarterts";
import type { CellContext } from "@tanstack/react-table";

export const dateCell: (
  props: CellContext<any, unknown>
) => React.ReactNode = ({ getValue }) => (
  <span className="inline-table font-light">
    {dayjs(getValue() as Date).format("D MMM YYYY") as number | string}
  </span>
);

export const numberCell: (
  props: CellContext<any, unknown>
) => React.ReactNode = ({ renderValue }) => (
  <span className="inline-table font-mono text-xs font-light">
    {renderValue() as number | string}
  </span>
);

export const digitCell: (
  props: CellContext<any, unknown>
) => React.ReactNode = ({ getValue }) => (
  <span className="inline-table font-mono text-xs font-light">
    {numberFormarter(getValue() as number) as string}
  </span>
);
