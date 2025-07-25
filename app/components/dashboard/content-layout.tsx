import type { Icons } from "~/components/utils/icons";
import { IconText } from "~/components/utils/icon-text";

export const DashbaordContentLayout = ({
  icon,
  title,
  children,
}: {
  title: string;
  icon: keyof typeof Icons;
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full overflow-y-auto pb-12 pd:mb-0">
      <IconText
        icon={icon}
        text={title}
        className="flex sticky top-0 bg-background/50 backdrop-blur-md z-2"
      />
      {children}
    </div>
  );
};
