import { cn } from "~/lib/utils";

import Icon from "~/components/utils/icons";
import type { Icons } from "~/components/utils/icons";

export const IconText = ({
  icon,
  text,
  active,
  className,
}: {
  text: string;
  active?: boolean;
  className?: string;
  icon: keyof typeof Icons;
}) => {
  return (
    <div
      className={cn(
        "p-4 lg:py-3 lg:px-4 border-b flex items-center gap-2  text-foreground/60 [&>svg]:size-6 lg:[&>svg]:size-5",
        active ? "text-primary" : "text-foreground/70",
        className
      )}
    >
      <Icon name={icon} />
      <h2 className="text-base font-light lg:text-sm lg:font-normal">{text}</h2>
    </div>
  );
};
