import { Badge } from "~/components/ui/badge";

import { currencyFormarter, percentageFormarter } from "~/lib/formarterts";

type FinanceData = { label: string; amountPaid: number; percentage: number };

const generateColors = (amount: number): string => {
  if (amount < 60) return "#FF4D4F";
  if (amount < 80) return "#FAAD14";
  if (amount < 100) return "#1890FF";
  if (amount === 100) return "#52C41A";
  return "#1890FF";
};

export const FinanceCard = ({ data }: { data: FinanceData }) => {
  const { label, amountPaid, percentage } = data;
  return (
    <li
      key={label}
      className="flex flex-col p-4 gap-8 justify-between border-r border-b"
    >
      <h4 className="text-base font-light">{label}</h4>
      <div className="space-y-2">
        <div className="flex items-center flex-wrap gap-2">
          <p className="font-mono text-xs font-light">
            {currencyFormarter(amountPaid)}
          </p>
          <Badge
            style={{ background: `${generateColors(percentage)}` }}
            className="tabular-nums font-mono text-[10px] font-light"
          >
            {percentageFormarter(percentage / 100)}
          </Badge>
        </div>
        <p
          className={"font-mono text-foreground/50 text-[10px] leading-[14px]"}
        >
          Of the total amount
        </p>
      </div>
    </li>
  );
};
