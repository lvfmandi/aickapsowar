import Icon, { Icons } from "~/components/utils/icons";
import { cn } from "~/lib/utils";

export type IconData = {
  monoFont?: boolean;
  key: string | number;
  value: string | number;
}[];

export type IconDataDisplay = {
  data: IconData;
  icon: keyof typeof Icons;
};

export const IconDataDisplay = ({ icon, data }: IconDataDisplay) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[minmax(140px,_1fr)_minmax(auto,_6fr)]">
      <div className="bg-primary flex items-center justify-center min-h-[140px] md:aspect-square">
        <Icon
          name={icon}
          className="text-background opacity-30 size-20 [&>path]:shadow-2xs"
        />
      </div>
      <div className="p-4 border border-t-0  md:border-l-0 md:border-t space-y-2 flex flex-col justify-center">
        {data.map(({ key, value, monoFont }, index) => (
          <p
            key={`${key}${index}`}
            className="text-base font-light lg:text-sm lg:font-normal"
          >
            {key}:{" "}
            <span
              className={cn(
                "text-muted-foreground",
                monoFont
                  ? "font-mono font-light text-sm lg:text-xs"
                  : "text-base font-light lg:text-sm lg:font-normal"
              )}
            >
              {value}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};
