import type { ButtonHTMLAttributes } from "react";

import { Button } from "~/components/ui/button";
import Icon, { Icons } from "~/components/utils/icons";
import { IconText } from "~/components/utils/icon-text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export type TabItem = {
  value: string;
  label: string;
  icon: keyof typeof Icons;
  content: React.ReactNode;
  button?: Partial<ButtonHTMLAttributes<HTMLButtonElement>>;
};

type TabUtils = {
  data: TabItem[];
  initialValue?: string;
  handleOnChange?: (value: string) => any;
};

export const TabsUtils = ({ data, initialValue, handleOnChange }: TabUtils) => {
  console.log({ initialValue });

  return (
    <Tabs
      className="p-4 w-full"
      onValueChange={handleOnChange}
      defaultValue={initialValue ?? data[0].value}
    >
      <TabsList className="flex-wrap h-fit">
        {data.map(({ icon, label, value }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="text-base gap-2 font-light lg:text-xs lg:font-semibold data-[state=active]:text-primary"
          >
            <Icon name={icon} className="size-5" />
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map(({ icon, label, value, button, content }) => (
        <TabsContent key={value} value={value} className="h-full">
          <div className="flex items-center justify-between border-b">
            <IconText
              active
              text={label}
              icon={icon}
              className="lg:px-3 border-b-0"
            />
            {button && (
              <Button variant="outline" onClick={button?.onClick} {...button} />
            )}
          </div>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
