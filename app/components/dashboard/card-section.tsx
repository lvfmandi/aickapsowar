import React from "react";

import { Icons } from "~/components/utils/icons";
import { IconText } from "~/components/utils/icon-text";

export const DashboardCardSection = ({
  icon,
  items,
  title,
  itemComponent: ItemComponent,
}: {
  items: any[];
  title?: string;
  icon?: keyof typeof Icons;
  itemComponent: React.ComponentType<any>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {icon && title && (
        <IconText icon={icon} text={title} className="border-b-0 !px-0" />
      )}
      <ul className="grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] auto-rows-fr border-t border-l">
        {items.map((item, index) => (
          <ItemComponent key={index} data={item} />
        ))}
      </ul>
    </div>
  );
};
