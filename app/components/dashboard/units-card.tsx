import { Link } from "react-router";
import Icon from "~/components/utils/icons";
import { cn } from "~/lib/utils";

type UnitData = {
  link?: string;
  label: string;
  number: number;
  completed?: boolean;
};

export const UnitsCard = ({ data }: { data: UnitData }) => {
  const { link, label, number, completed } = data;

  const Wrapper = link ? Link : "div";

  return (
    <li key={label} className="border-r border-b">
      <Wrapper
        to={link || ""}
        className={cn(
          "flex p-4 gap-8 justify-between h-full",
          link ? "flex-col-reverse bg-accent text-foreground hover:text-primary transition-colors duration-500 ease-in" : "flex-col"
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
          {/* TODO: Check the total number of units */}
          <p
            className={
              "font-mono text-foreground/50 text-[10px] leading-[14px]"
            }
          >
            Of the 7 units
          </p>
        </div>
      </Wrapper>
    </li>
  );
};
