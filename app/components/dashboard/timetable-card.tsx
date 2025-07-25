import Icon from "~/components/utils/icons";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type TimetableData = {
  label: string;
  active?: boolean;
  description: string;
};

export const TimetableCard = ({ data }: { data: TimetableData }) => {
  const { label, description, active } = data;
  return (
    <li
      key={label}
      className="flex flex-col p-4 gap-8 justify-between border-r border-b"
    >
      <div className="flex items-start gap-2">
        <h4 className="text-base font-light">{label}</h4>
        {active && (
          <Icon
            name="verified"
            className="fill-blue-500 text-background dark:text-gray-300 size-4"
          />
        )}
      </div>
      <div className="space-y-2">
        <Button
          className="w-full"
          variant={"outline"}
          disabled={!Boolean(active)}
        >
          <Icon name="print" />
          Print
        </Button>
        <p
          className={cn(
            "font-mono text-[10px]",
            active ? "text-foreground" : "font-medium text-foreground/50"
          )}
        >
          {description}
        </p>
      </div>
    </li>
  );
};
