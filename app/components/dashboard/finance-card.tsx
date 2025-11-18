import { Badge } from "~/components/ui/badge";

import { currencyFormarter } from "~/lib/formarterts";

type FinanceData = { label: string; description: string; balance: number };

export const FinanceCard = ({ data }: { data: FinanceData }) => {
  const { label, balance } = data;
  return (
    <li
      key={label}
      className="flex flex-col p-4 gap-8 justify-between border-r border-b"
    >
      <h4 className="text-base font-light">{label}</h4>
      <div className="space-y-2">
        <div className="flex items-center flex-wrap gap-2">
          <p className="font-mono text-xs font-light">
            {currencyFormarter(balance)}
          </p>
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
