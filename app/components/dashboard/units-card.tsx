import { useNavigate } from "react-router";

import { cn, NORMAL } from "~/lib/utils";
import { useStore } from "~/lib/store/index.store";

import Icon from "~/components/utils/icons";
import { columns } from "../tables/semester-units/normal-registration-columns";

type UnitData = {
  link?: string;
  label: string;
  number: number;
  completed?: boolean;
  description: string;
};

export const UnitsCard = ({ data }: { data: UnitData }) => {
  const navigate = useNavigate();

  const { setCurrentUnitTab, setCurrentUnitColumns } = useStore(
    (state) => state
  );
  const { link, label, number, completed, description } = data;

  const handleNavigate = () => {
    if (link) {
      setCurrentUnitTab(NORMAL);
      setCurrentUnitColumns(columns);
      navigate(link);
    }
  };

  return (
    <li key={label} className="border-r border-b">
      <div
        onClick={handleNavigate}
        className={cn(
          "flex p-4 gap-8 justify-between h-full",
          link
            ? "flex-col-reverse bg-accent text-foreground hover:text-primary transition-colors duration-500 ease-in cursor-pointer"
            : "flex-col"
        )}
      >
        <h4 className="text-base font-light">{label}</h4>
        <div className={cn(link ? "flex" : "hidden", "justify-end")}>
          <Icon name="arrowUp" className="rotate-45" />
        </div>
        <div className={cn("space-y-2", link ? "hidden" : "block")}>
          <div className="flex items-start flex-wrap gap-1">
            <p className="font-mono text-xl text-foreground font-light">
              {number}
            </p>
            {Boolean(completed) && (
              <Icon
                name="verified"
                size={16}
                className="text-background fill-blue-500"
              />
            )}
          </div>
          <p
            className={
              "font-mono text-foreground/50 text-[10px] leading-[14px]"
            }
          >
            {description}
          </p>
        </div>
      </div>
    </li>
  );
};
